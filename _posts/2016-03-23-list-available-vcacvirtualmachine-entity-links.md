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
<table>
<tbody>
<tr>
<th>vCAC:VirtualMachine Links</th>
</tr>
<tr>
<td>KeyPairCommon</td>
</tr>
<tr>
<td>StaticIPv4Addresses</td>
</tr>
<tr>
<td>ParentVirtualMachine</td>
</tr>
<tr>
<td>VMToNetworks</td>
</tr>
<tr>
<td>Cost</td>
</tr>
<tr>
<td>Approver</td>
</tr>
<tr>
<td>AppServiceComponent</td>
</tr>
<tr>
<td>Host</td>
</tr>
<tr>
<td>VMPerformance</td>
</tr>
<tr>
<td>VirtualMachineProperties</td>
</tr>
<tr>
<td>VirtualMachineExt</td>
</tr>
<tr>
<td>ChildVirtualMachines</td>
</tr>
<tr>
<td>VMSnapshots</td>
</tr>
<tr>
<td>AppServiceComponentTemplates</td>
</tr>
<tr>
<td>HostReservation</td>
</tr>
<tr>
<td>VMDiskHardware</td>
</tr>
<tr>
<td>HostReservationToStorage</td>
</tr>
<tr>
<td>VirtualMachineTemplate</td>
</tr>
<tr>
<td>ResourcePool</td>
</tr>
<tr>
<td>Requests</td>
</tr>
<tr>
<td>Components</td>
</tr>
<tr>
<td>PhysicalMachine</td>
</tr>
<tr>
<td>Owner</td>
</tr>
<tr>
<td>StateOperations</td>
</tr>
</tbody>
</table>
<!--more-->

If you want to explore the properties associated with one of the above links you can use this scriptable task. Just set the **linkName** variable to one of the links from the table above.

<script src="https://gist.github.com/chelnak/03eebad726f5e3ade12d.js"></script>

&nbsp;