---
title: 'SharePoint 2010 - Search Center Internal Server Error Exception'
date: 2011-05-23T16:12:00+00:00
author: Craig
layout: post
permalink: /2011/05/sharepoint-2010-search-center-internal.html
categories:
  - SharePoint
---

After provisioning my Enterprise Search Center, setting my content sources and performing the initial crawls I couldn't seem to actually produce any results from a query and kept getting an "Internal Server Error Exception" message (Bellow).

![InternalServerError](/assets/images/InternalServerError-300x134.png)

<!--more-->

Here are the steps I took to fix this issue.

* Go to Application Management and select Configure service application associations under the Service Application heading.
* Select the default Application Group. This will open the Associations window.

![AssocPage](/assets/images/AssocPage-300x213.png)

* There were two application proxies listed for search, one of which was the old deleted one. The one I had manually created (Search Service Application 1) was listed but not selected - Meaning it was not associated with any web applications.
* To associate the application proxy with the default proxy group; select Search Service Application 1
* Then click on set as default, followed by OK.
* Issue an IIS reset on the server that manages Search.

After adding the association I was then able to get search results back from my query.
