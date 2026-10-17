---
title: "The memory that wouldn't come back"
date: 2026-10-23T09:00:00+01:00
author: Craig
layout: post
permalink: /2026/10/the-memory-that-wouldnt-come-back.html
categories:
  - Virtualization
tags:
  - Docker
  - virtio-fs
  - Memory
---

Recently, while working on Docker VMM, I was investigating memory usage when sharing a large folder with a VM over virtio-fs. The file-sharing server runs on the host.

After running `find` across the folder and [dropping the guest's caches](https://www.kernel.org/doc/html/v6.12/admin-guide/sysctl/vm.html#drop-caches), the host process was still holding more memory than before the walk.

<!--more-->

## Following the references

The guest's `/proc/meminfo` showed that most of its cached file data and filesystem metadata had been cleared. But that only told me what was happening inside the guest. It didn't tell me what the file-sharing server was still holding on the host.

I started logging the server's inode table alongside process memory. This table maps the node IDs given to the guest to the file and directory state kept by the server. Entries were still there after the guest dropped its caches.

[virtio-fs uses the FUSE protocol](https://docs.kernel.org/filesystems/virtiofs.html) to pass filesystem requests between the guest and the server on the host. FUSE tracks lookup references to nodes: a count of how many references the guest holds to each one. The guest releases them through [FORGET requests](https://libfuse.github.io/doxygen/structfuse__lowlevel__ops.html), allowing the server to free its state once nothing else needs it.

The bug was in our handling of `READDIRPLUS`. This returns directory entries with their attributes and adds a lookup reference for each returned entry, except `.` and `..`.

Our implementation looked up more entries than would fit in the reply. The reply builder discarded the overflow, but didn't undo those references. Later requests could look up the same entries again.

The guest couldn't release references it had never been told about. That's what kept the host state alive.

## Only look up what fits

The fix was to check whether each entry would fit in the reply **before** looking it up, using the same size calculation as the reply builder.

![For an entry that will not fit: before the fix, lookup takes a reference and the reply builder omits the entry, leaving that reference behind. After the fix, the size check stops reply construction before lookup, so no reference is taken.]({{ '/assets/images/memory-that-wouldnt-come-back/reply-budget.svg' | relative_url }})

With that change, the inode table drained after the guest released its references. The server was no longer holding lookup references for entries it hadn't sent.

I'd spent time looking at the guest's memory, but the useful clue was in the server's inode table. Once I could see which entries weren't going away, I had somewhere to look.
