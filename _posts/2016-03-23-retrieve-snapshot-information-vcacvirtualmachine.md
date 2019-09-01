---
title: Retrieve snapshot information from a vCAC:VirtualMachine
date: 2016-03-23T15:00:15+00:00
author: Craig
layout: post
permalink: /2016/03/retrieve-snapshot-information-vcacvirtualmachine.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vExpert
  - vRA
  - vRO
---
I'd always wondered if you could retrieve snapshot information from a vCACVirtualMachine object. As it wasn't immediately obvious from the API explorer I put the idea to bed and got on with other things. However, it turns out you can get this information but you need to get the VMEntity then look at the **VMSnapshots** link.

<!--more-->

Here is an action that will return an array of virtual machine snapshot properties:
<script src="https://gist.github.com/chelnak/915bc872fb8b1e7d7a45.js"></script>

:-)