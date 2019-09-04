---
title: List of available VCAC:VirtualMachine entity links
date: 2016-03-23T19:00:55+00:00
author: Craig
layout: post
permalink: /2016/03/list-available-vcacvirtualmachine-entity-links.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vExpert
  - vRA
  - vRO
---
Off the back of my <a href="http://wp.me/p6O7V1-af">previous post</a>, I thought it would be a good idea to post a list of the links available from a virtual machine entity:

<!--more-->

|vCAC:VirtualMachine Links|
|--- |
|KeyPairCommon|
|StaticIPv4Addresses|
|ParentVirtualMachine|
|VMToNetworks|
|Cost|
|Approver|
|AppServiceComponent|
|Host|
|VMPerformance|
|VirtualMachineProperties|
|VirtualMachineExt|
|ChildVirtualMachines|
|VMSnapshots|
|AppServiceComponentTemplates|
|HostReservation|
|VMDiskHardware|
|HostReservationToStorage|
|VirtualMachineTemplate|
|ResourcePool|
|Requests|
|Components|
|PhysicalMachine|
|Owner|
|StateOperations|

If you want to explore the properties associated with one of the above links you can use this scriptable task. Just set the **linkName** variable to one of the links from the table above.

<script src="https://gist.github.com/chelnak/03eebad726f5e3ade12d.js"></script>
