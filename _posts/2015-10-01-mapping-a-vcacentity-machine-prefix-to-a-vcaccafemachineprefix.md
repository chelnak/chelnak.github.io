---
title: Mapping a vCAC:Entity Machine Prefix to a vCACCAFE:MachinePrefix
date: 2015-10-01T18:02:31+00:00
author: Craig
layout: post
permalink: /2015/10/mapping-a-vcacentity-machine-prefix-to-a-vcaccafemachineprefix.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vCAC
  - vRA
  - vRO
---
## Background

Back in November last year I was asked to create an Advanced Service that would automate the creation of new "customers" in vRA.

One of the first issues I came across was that the output of the Create a Machine Prefix workflow was a vCAC:Entity object and the type for defaultMachinePrefix in the Create a Business Group workflow was vCACCAFE:MachinePrefix.

Obviously there is a mismatch there, and when trying to bind the two the workflow failed. So after quite a bit of banging my head on the keyboard I created the following [communities post](https://communities.vmware.com/thread/495016).

<!--more-->

Almost a month went by with no response and I ended up writing the following action to do the job:

<script src="https://gist.github.com/chelnak/e494c3d5348df971c6fb.js"></script>

## Issue

The main issue with the code above (apart from there being a lot of it) is that the getMachinePrefixes method of vCACCAFEEntitiesFinder _only returns a single page of 25 results_. Now that's fine if you know you are never going to have more that 25 prefixes in your environment, but you soon hit the limits when testing. This was also confirmed by my collegue [Jonathan Medd](http://jonathanmedd.net) / @jonathanmedd ([communities post](https://communities.vmware.com/thread/521041). It seemed like 25 was the magic number and there was no way to change it.

## Solution

It turns out that you can pass the MachinePrefix property (machine prefix name) of the entity as a query string to `vCACCAFEEntitiesFinder.findMachinePrefixes`...

<script src="https://gist.github.com/chelnak/5b44eb46d4fef86a7ed7.js"></script>

In fact, from the above post, it looks as if Jonathan was part way there! :-)

To test this new solution, I created a small workflow that will create a predefined number of machine prefixes and performs the mapping between vCAC:Entity Machine Prefix and vCACCAFE:MachinePrefix..

![vCACCAFE:MachinePrefix](/assets/images/TestMappings.png)

Results were good and the new solution reduces the code footprint from around 30 lines to 3!
