---
title: 'Removing vRealize Automation DEM-Orchestrators [UNSUPPORTED]'
date: 2015-08-04T12:37:00+00:00
author: Craig
layout: post
permalink: /2015/08/removing-vrealize-automation-dem.html
categories:
  - vRealize Automation
tags:
  - vCAC
  - vRA
---
This is just a quick post that is more for personal reference more than anything.

**I need to point out that this is probably not supported by VMware so please don't carry out the steps below unless you fully accept that you could cause irreversible damage to your environment.**

I needed to move my original test design around a bit and this involved installing new highly available DEM Ochestrators and removing the old one.

Uninstalling the old DEM Orchestrator instance wasn't a problem, however, I noticed that it was still listed in **Distributed Execution Status** as offline.

Here are the steps that I took to fully remove the old DEM Orchestrator from my environment:
<ol>
* **Snapshot, snapshot, snapshot!**
* Install the two new DEM Orchestrator instances
* Uninstall the old DEM Orchestrator instance
* **Back up your IAAS database!**
* Remove the old DEM Orchestrator entry from the IAAS database
</ol>
<!--more-->
<h3>Step 5 Explanation</h3>
First double check that the entry for the old instance is present:
```use vCAC
SELECT * FROM [DynamicOps.RepositoryModel].DEMs
go```
You should see the old DEM Orchestrator instance in the list. Remove it with the following TSQL statement:
```use vCAC
DELETE FROM [DynamicOps.RepositoryModel].DEMs
WHERE FriendlyName = 'OLD-DEM-ORCHESTRATOR'
go```
Now restart the IAAS services and take a look back in Distributed Execution Status. The entry should now be gone.