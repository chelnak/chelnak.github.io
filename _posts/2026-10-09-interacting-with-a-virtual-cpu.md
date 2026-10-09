---
title: Interacting with a Virtual CPU
date: 2026-10-09T09:00:00+01:00
author: Craig
layout: post
permalink: /2026/10/interacting-with-a-virtual-cpu.html
categories:
  - Virtualization
tags:
  - Docker
  - Rust
  - Windows Hypervisor Platform
---

## Introduction

I get to work on a lot of cool things at Docker. Recently, my focus has been on the new [Docker VMM](https://www.docker.com/blog/docker-vmm-public-beta/), the virtual machine manager that powers Docker Sandboxes and is also available in Docker Desktop (beta).

Agentic workflows have made it much easier to dig deep into machine internals. But I think it’s important to take a step back sometimes and understand what’s actually happening in the dungeons of your code.

In this post, we’ll look at how we interact with a virtual CPU through [Windows Hypervisor Platform (WHP)](https://learn.microsoft.com/en-us/virtualization/api/hypervisor-platform/hypervisor-platform): setting its initial state, running guest instructions, and handling execution when control returns to us.

The example targets x64 Windows with Windows Hypervisor Platform enabled. The snippets use the Rust `windows` crate with the `Win32_System_Hypervisor` and `Win32_System_Memory` features. They show the key steps in order, with the surrounding function, `unsafe` blocks and final resource cleanup omitted for brevity.

<!--more-->

## Partitions, memory and vCPU setup

Before we create a vCPU, it needs somewhere to run. Enter [partitions](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/architecture#root-and-child-partitions).

We can think of a partition as an isolation boundary that contains the guest’s physical address space and
virtual processors.

The host operating system runs in a root partition and manages hardware access. A guest will run in a child
partition and is presented with a view of memory and hardware.

Docker VMM on Windows, for example, runs in the root partition. It provides the guest with a set of virtual devices and [maps memory](https://learn.microsoft.com/en-us/virtualization/api/hypervisor-platform/hypervisor-platform#vm-memory-management) from its own process into the guest’s physical address space.

Creating a partition is a three-step process. We first create a partition object, configure its properties, then create the actual partition in the hypervisor.

Here's a quick example that uses `WHvCreatePartition`, `WHvSetPartitionProperty` and `WHvSetupPartition` to
create a new partition and specify a single processor. Note, we don't have a vCPU yet!

```rust
use std::mem::size_of;
use windows::Win32::System::Hypervisor::*;

// Create the partition object.
let partition = WHvCreatePartition()?;

// Configure the partition for one virtual processor.
let processor_count: u32 = 1;
WHvSetPartitionProperty(
    partition,
    WHvPartitionPropertyCodeProcessorCount,
    (&processor_count as *const u32).cast(),
    size_of::<u32>() as u32,
)?;

// Create the actual partition in the hypervisor.
WHvSetupPartition(partition)?;
```

The partition now exists (great!), but has no memory for the guest to use. We need somewhere to
put the instructions that our vCPU will execute.

First, we'll need to [allocate memory](https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualalloc) in our host process, then use [`WHvMapGpaRange`](https://learn.microsoft.com/en-us/virtualization/api/hypervisor-platform/funcs/whvmapgparange) to map
that memory into the guest’s physical address space.

```rust
use windows::{
    core::Error,
    Win32::System::Memory::*,
};

const MEMORY_SIZE: usize = 4096;
const GUEST_ADDRESS: u64 = 0x1000;

// Allocate a page in our VMM's host process.
let memory = VirtualAlloc(
    None,
    MEMORY_SIZE,
    MEM_RESERVE | MEM_COMMIT,
    PAGE_READWRITE,
);

if memory.is_null() {
    return Err(Error::from_thread());
}

// A tiny x86 guest program: HLT.
// We'll configure the vCPU to execute this instruction later.
memory.cast::<u8>().write(0xF4);

// Make this page readable and executable by the guest.
if let Err(error) = WHvMapGpaRange(
    partition,
    memory,
    GUEST_ADDRESS,
    MEMORY_SIZE as u64,
    WHvMapGpaRangeFlagRead | WHvMapGpaRangeFlagExecute,
) {
    let _ = VirtualFree(memory, 0, MEM_RELEASE);
    return Err(error);
}
```

The host process and the guest can now access the same backing memory through their respective address spaces.

## Instructions and state

With our partition and memory in place, we can now create a virtual CPU. Before it can run, though, we need to configure its initial state.

Earlier we created a small guest program consisting of a single [HLT](https://en.wikipedia.org/wiki/HLT_(x86_instruction)) instruction (`0xF4`). We then placed
it at `0x1000` in the guest’s physical address space.

`HLT` places the virtual processor in a halted state. For this example, that gives us a simple stopping point.

Now we can create a vCPU using `WHvCreateVirtualProcessor`, passing our partition handle and processor index `0`.

```rust
WHvCreateVirtualProcessor(partition, 0, 0)?;
```

Great, so it should just work now, right? Not quite! Creating a vCPU doesn't tell it where our program is.

For that, we need to configure its [registers](https://learn.microsoft.com/en-us/virtualization/api/hypervisor-platform/funcs/whvvirtualprocessordatatypes). Registers are small storage locations in a CPU that hold data, addresses and control flags. They form part of the CPU's execution state.

We'll use [16-bit real mode](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) with paging disabled. That lets us reach our instruction without setting up page tables.

The control registers select our execution mode. The code segment and instruction pointer determine where execution begins, while the flags register supplies the initial processor flags.

```rust
// Use a 16-bit code segment with a base address of zero.
let mut code_segment = WHV_X64_SEGMENT_REGISTER::default();
code_segment.Base = 0;
code_segment.Limit = 0xFFFF;
code_segment.Selector = 0;
code_segment.Anonymous.Attributes = 0x009B; // Present, executable, readable.

// Each register name corresponds to a value in the array below.
let register_names = [
    WHvX64RegisterCr0,
    WHvX64RegisterCr3,
    WHvX64RegisterCr4,
    WHvX64RegisterEfer,
    WHvX64RegisterCs,
    WHvX64RegisterRip,
    WHvX64RegisterRflags,
];

let register_values = [
    WHV_REGISTER_VALUE { Reg64: 0x20 }, // Real mode, paging disabled.
    WHV_REGISTER_VALUE { Reg64: 0 },    // No page tables.
    WHV_REGISTER_VALUE { Reg64: 0 },    // No CR4 extensions.
    WHV_REGISTER_VALUE { Reg64: 0 },    // Long mode disabled.
    WHV_REGISTER_VALUE {
        Segment: code_segment,
    },
    WHV_REGISTER_VALUE {
        Reg64: GUEST_ADDRESS,          // HLT lives at 0x1000.
    },
    WHV_REGISTER_VALUE { Reg64: 0x2 }, // Reserved bit 1 must be set.
];

// Apply the initial state to virtual processor 0.
WHvSetVirtualProcessorRegisters(
    partition,
    0,
    register_names.as_ptr(),
    register_names.len() as u32,
    register_values.as_ptr(),
)?;
```

Notice how we’ve set the instruction pointer to `GUEST_ADDRESS` (`0x1000`). With the code segment’s base set to zero and paging disabled, this points to our guest’s first instruction.

To apply these values we use `WHvSetVirtualProcessorRegisters`. It expects an array of names and corresponding values.

Our vCPU is now ready to execute the `HLT` instruction.

## Run and handle the exit

Now we can run the vCPU with [`WHvRunVirtualProcessor`](https://learn.microsoft.com/en-us/virtualization/api/hypervisor-platform/funcs/whvrunvirtualprocessor). This call blocks while the guest executes.

When the call returns successfully, WHP gives us an exit context explaining why control returned to our VMM. We can inspect this and decide what to do next.

Our guest should immediately execute `HLT`, so we expect a halt exit.

An exit doesn’t necessarily mean something went wrong. The guest might have accessed an I/O port or memory that needs the VMM’s attention. The exit reason tells us which case we need to handle.

```rust
let mut exit_context = WHV_RUN_VP_EXIT_CONTEXT::default();

WHvRunVirtualProcessor(
    partition,
    0,
    (&mut exit_context as *mut WHV_RUN_VP_EXIT_CONTEXT).cast(),
    std::mem::size_of::<WHV_RUN_VP_EXIT_CONTEXT>() as u32,
)?;

match exit_context.ExitReason {
    WHvRunVpExitReasonX64Halt => {
        println!("Our guest executed HLT!");
    }
    reason => {
        println!("Unexpected exit: {reason:?}");
    }
}
```

A more complete VMM repeats this process in a run loop. Depending on the exit reason, it might emulate a device operation, update registers or access guest memory before calling `WHvRunVirtualProcessor` again. Some operations also require advancing the instruction pointer. Other exits require stopping the guest rather than resuming it.

Our guest only executes a single instruction, but we’ve covered the essentials: create a partition, map memory, configure a vCPU and run it until control returns to us.

You can find the complete runnable example on [GitHub](https://gist.github.com/chelnak/d1968783cde6734bfba01b6eed7a650a).
