---
title: 'SharePoint 2010 - Cleaning up old timer jobs'
date: 2011-05-26T09:19:00+00:00
author: Craig
layout: post
permalink: /2011/05/sharepoint-2010-cleaning-up-old-timer.html
categories:
  - PowerShell
  - SharePoint
---
After deleting the Search Service Application that got created by running the Farm Configuration Wizard I noticed that there were still some timer jobs relating the application left over. It's always good to keep on top of your infrastructure housekeeping, no matter how small the element is.

<!--more-->

The following steps apply to any timer job - just make sure you use the right GUID when issuing the STSADM command!

First step is to load the SharePoint 2010 Management Shell. From here we want to use the `Get-SPTimerJob` cmdlet to get the GUID of the timer job. Running the cmdlet on its own wont display the information we need, and just lists schedule information.

![Get-SPTimerJob](/assets/images/Get-SPTimerjob-300x131.png)

To get to the GUID I piped the Format-List command along with DisplayName and Id (which is the GUID we need to remove the job).

```powershell
Get-SPTimerJob | fl DisplayName,Id
```

![Get-SPTimerJob](/assets/images/Get-SPTimerJobFL-300x109.png)

Now use STSADM.exe along with the GUID of the timer job that needs removing.

```powershell
stsadm -o deleteconfigurationobject -id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Alternatively you could drop the timer job in to a variable and use the delete() method:

```powershell
$t = Get-SPTimerJob -Identity xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
$t.Delete()
```
