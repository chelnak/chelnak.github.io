---
title: Get resources provisioned by a vRA request in vRO
date: 2016-03-07T15:21:09+00:00
author: Craig
layout: post
permalink: /2016/03/get-resources-provisioned-vra-request.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vExpert
  - vRA
  - vRO
---
Sometimes you might need to programatically get information about resources provisioned by an IaaS request in vRA.

This can easily be achieved by using the **getResourcesProvisionedByRequest()** method of **vCACCAFECatalogConsumerRequestService**.

It will return a vCACCAFEPagedResource object on which you call getContent() to get at the underlying information. In this case it is an array of vCACCAFECatalogResource.

Here is a quick example of how to use it..

<!--more-->

<script src="https://gist.github.com/chelnak/146d5147dc56eeb75fec.js"></script>
