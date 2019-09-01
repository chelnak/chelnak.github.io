---
title: Finding the machine manufacturer and model for MDT driver MGMT withPowershell
date: 2011-08-17T14:46:00+00:00
author: Craig
layout: post
permalink: /2011/08/finding-machine-manufacturer-and-model_17.html
categories:
  - PowerShell
  - Windows
tags:
  - MDT
  - PowerShell
---

This is obviously in a million and one places already but I found this simple cmdlet **extremely** helpful yesterday.

<!--more-->

```
Get-WmiObject Win32_ComputerSystem
```
You should then get output in the following format:

![](/assets/images/PS-300x100.png)

With this information you can now create corresponding folders under the Out-of-Box Drivers node in the workbench (see image bellow) then use the %make% & %model% variables in your MDT Task Sequence to inject.

![](/assets/images/Workbench.png)

This video from [http://deploymentresearch.com](http://www.deploymentresearch.com/LinkClick.aspx?link=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DbWdGBVyD1pM&tabid=63&mid=382) is excellent and explains driver management in MDT in a fair bit of detail.