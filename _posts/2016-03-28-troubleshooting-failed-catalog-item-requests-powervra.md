---
title: Troubleshooting failed catalog item requests with PowervRA
date: 2016-03-28T14:30:43+00:00
author: Craig
layout: post
permalink: /2016/03/troubleshooting-failed-catalog-item-requests-powervra.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowervRA
  - vExpert
  - vRA
---
Here is a quick tip that will show you how to quickly troubleshoot a failed request in vRA.

Connect to your vRA instance:
```Connect-vRAServer -Server vra.corp.local -Tenant Tenant01 -Credential (Get-Credential) -IgnoreCertRequirements
```
Now find the failed request:
```Get-vRAConsumerRequest | Where-Object {$_.StateName -eq "Failed"} | Select RequestNumber, RequestedItemName, StateName | Sort-Object -Property RequestNumber```
Then to determine the cause, take a look at the requestCompletion property of the request:
```(Get-vRAConsumerRequest -RequestNumber 121).RequestCompletion | Format-List```
```requestCompletionState : FAILED
completionDetails : A server error was encountered Error requesting machine. Cannot find network profile WebServers..
```