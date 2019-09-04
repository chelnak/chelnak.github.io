---
title: Reset the password of a local vRA user principal with vRO
date: 2016-10-06T13:00:19+00:00
author: Craig
layout: post
permalink: /2016/10/reset-password-local-vra-user-principal-vro.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vExpert
  - vRA7
  - vRO
---
A question that I frequently see popping up is "*How can I reset the password of local user in vRA?*". A while back I blogged about [how to achive this](https://www.helloitscraig.co.uk/2016/07/managing-local-users-powervra.html) with PowervRA and Set-vRAUserPrincipal. However that might not be applicable to every situation.

An alternative solution could be to use a vRO workflow. The workflow could then be presented as an XaaS blueprint and published to the catalog, enabling administrators to reset passwords via the UI.

<!--more-->

The functionality for getting and updating principals exists in the authenticationPrincipalService:

<script src="https://gist.github.com/chelnak/2a3d3c5ffa1e4a9b5d67fe04a3cb078d.js"></script>

In fact, if you take a closer look at the vCACCAFEUser class it's possible to see what else you could achieve using the script above as a framework.

![Capture](/assets/images/Capture.png)
