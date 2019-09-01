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
With the <a href="https://www.powershellgallery.com/packages/PowervRA/2.2.0">latest release</a> we are pleased to provide you with the ability to start a vRA data collection from PowervRA!

**Invoke-vRADataCollection** takes advantage of the <a href="http://pubs.vmware.com/vrealize-automation-72/topic/com.vmware.vra.restapi.doc/docs/o11n-gateway-service.html">**o11n-gateway-service**</a> endpoint which appeared in vRA 7.1.

From the documentation:
<blockquote>The orchestration gateway service provides a gateway to VMware Realize Orchestrator (vRO) for services running on vRealize Automation. By using the gateway, consumers of the API can access a vRO instance, and initiate workflows or script actions without having to deal directly with the vRO APIs.</blockquote>
The new function uses this service to execute the **Force data collection** workflow that is included as a Library workflow and part of the vRA plugin for vRO.

<!--more-->
<h2>Usage</h2>
Usage is simple. You just need the one function, **Invoke-vRADataCollection**.

**** vRA 7.1 or above is required to use this feature**

<img class="alignnone wp-image-989 size-full" title="vRA data collection" src="https://www.helloitscraig.co.uk/wp-content/uploads/2017/04/dcoll.png" alt="vRA data collection" width="1117" height="354" />

The function is currently fire and forget and wont return the status of the data collection run. However you can still check the status via the web interface:

<img class="alignnone wp-image-997 size-medium" title="vRA data collection" src="https://www.helloitscraig.co.uk/wp-content/uploads/2017/04/datacol-300x151.png" alt="vRA data collection" width="300" height="151" />

**Tip:** If you want to examine the payload being sent by any **New / Set / Invoke** functions you can use the **Debug** switch. For example:

<img class="alignnone wp-image-996 size-full" title="vRA data collection" src="https://www.helloitscraig.co.uk/wp-content/uploads/2017/04/debug.png" alt="vRA data collection" width="1101" height="397" />

Enjoy!