---
title: 'PowervRA v2.2.0 - Invoking a vRA data collection'
date: 2017-04-25T15:56:14+00:00
author: Craig
layout: post
permalink: /2017/04/powervra-v2-2-0-invoke-vra-data-collection.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowerShell
  - PowervRA
  - vExpert
  - vRA7
---
With the [latest release](https://www.powershellgallery.com/packages/PowervRA/2.2.0) we are pleased to provide you with the ability to start a vRA data collection from PowervRA!

**Invoke-vRADataCollection** takes advantage of the [**o11n-gateway-service**](http://pubs.vmware.com/vrealize-automation-72/topic/com.vmware.vra.restapi.doc/docs/o11n-gateway-service.html) endpoint which appeared in vRA 7.1.

From the documentation:
<blockquote>
The orchestration gateway service provides a gateway to VMware Realize Orchestrator (vRO) for services running on vRealize Automation. By using the gateway, consumers of the API can access a vRO instance, and initiate workflows or script actions without having to deal directly with the vRO APIs.
</blockquote>

The new function uses this service to execute the **Force data collection** workflow that is included as a Library workflow and part of the vRA plugin for vRO.

<!--more-->
## Usage
Usage is simple. You just need the one function, **Invoke-vRADataCollection**.

**vRA 7.1 or above is required to use this feature**

![](/assets/images/dcoll.png)


The function is currently fire and forget and wont return the status of the data collection run. However you can still check the status via the web interface:

![](/assets/images/datacol-300x151.png)

**Tip:** If you want to examine the payload being sent by any **New / Set / Invoke** functions you can use the **Debug** switch. For example:

![](/assets/images/debug.png)

Enjoy!