---
title: Retrieving the email address of a vRA user principal via vRO
date: 2016-10-04T13:30:36+00:00
author: Craig
layout: post
permalink: /2016/10/retrieving-email-address-user-principal-vra-vro.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vExpert
  - vRA7
  - vRO
---
If you don't have access to Active Directory via the vRO plugin retrieving information about a certain user can be tricky. Here is a quick example showing how to retrieve an email address from a vRA user principal with vRO. Obviously assuming that you have chosen to sync the attribute in your directory configuration.

<script src="https://gist.github.com/chelnak/1267acd42373f852ee64eae5fe12e3a4.js"></script>