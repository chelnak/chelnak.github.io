---
title: The Search Service is not able to connect to the Machine that hosts the administration components
date: 2011-05-23T15:32:00+00:00
author: Craig
layout: post
permalink: /2011/05/the-search-service-is-not-able-to.html
categories:
  - SharePoint
---
After having some issues with the Search Service Application that is created when you run the SharePoint 2010 Farm Configuration wizard I decided to delete it and manually configure my own Search Service app (conforming to M$ best practices). To my annoyance after creating the Service Application and clicking in to configure it I got the following error message:

"*The Search Service is not able to connect to the machine that hosts the administration components*"

<!--more-->

Looking at the event logs on the server in question led me to two warning events (Event ID 57) around the same time as I had clicked in to the Search Service App:

![](/assets/images/EventID57-b-300x209.png)

The above warnings suggested that (for some reason) even though I had selected my search service account (SP_Search) to run the search application it was in fact trying to run and access the search database with SP_ServiceApps, which is a generic managed account for some other Service Applications.

Solving this issue was as simple as changing the account that the SharePoint Server Search 14 service uses to log on with to SP_Search (from services.msc), Restarting the service and issuing an ```IISRESET /noforce```.

As soon as that was done I was able to get in to the Search Service Application and start to configure it.