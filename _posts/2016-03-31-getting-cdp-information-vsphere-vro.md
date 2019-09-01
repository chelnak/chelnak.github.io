---
title: Getting CDP information for vSphere hosts and clusters in vRO
date: 2016-03-31T14:30:02+00:00
author: Craig
layout: post
permalink: /2016/03/getting-cdp-information-vsphere-vro.html
categories:
  - vRealize Orchestrator
tags:
  - vExpert
  - vRO
---
This morning I noticed a conversation on twitter that pointed to the following communities post: <a href="https://communities.vmware.com/thread/533417">https://communities.vmware.com/thread/533417</a>

It reminded me that I had to do the same a while back. The requirement was to interrogate the hosts and send an email to the requester with cdp information in the body of the message and also as a html attachment.

<!--more-->

I thought I'd share what I had just in case somebody else had the same question in the future. The code is pretty dusty so could do with a bit of tidying up but here are the two gists:
<h2>Get CDP information for a vSphere cluster</h2>
<script src="https://gist.github.com/chelnak/cca7a7b6fbb866d923ea.js"></script>

<h2>Get CDP information for a vSphere host</h2>

<script src="https://gist.github.com/chelnak/73e92577fe804b3458be.js"></script>

&nbsp;

&nbsp;

&nbsp;