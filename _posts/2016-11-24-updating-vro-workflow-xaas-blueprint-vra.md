---
title: Updating the vRO Workflow Associated with an XaaS Blueprint in vRA
date: 2016-11-24T13:00:18+00:00
author: Craig
layout: post
permalink: /2016/11/updating-vro-workflow-xaas-blueprint-vra.html
categories:
  - vRealize Automation
tags:
  - vExpert
  - vRA7
---
The option to change the vRO workflow associated with an XaaS Blueprint isn't available through the UI. However, it is available via the vRA Plugin for vRO.

Obviously the more complex your workflow presentation the less viable this becomes but for simple presentations or workflows that only rely on context parameters it could be a neat solution.

<!--more-->

Before running the script below you'll need the id of the XaaS blueprint and the id of the **new **vRO workflow that is going to be associated.

<script src="https://gist.github.com/chelnak/0a6fb34302eac5446ba1424697807823.js"></script>

**Note:** Don't run this in production without testing first ;-)
