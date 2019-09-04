---
title: Rename resourceTypes in vRealize Automation with the catalog-service API
date: 2015-10-05T08:38:01+00:00
author: Craig
layout: post
permalink: /2015/10/rename-resourcetypes-in-vrealize-automation-with-the-catalog-service-api.html
categories:
  - vRealize Automation
tags:
  - vCAC
  - vRA
---
## What is a resource type?
This is straight from the <a href="http://pubs.vmware.com/vra-62/index.jsp#docs/resource_ResourceType.html" target="_blank">catalog-service API docs</a>:
<blockquote>A type assigned to resources. The types are defined by the provider types. It allows similar resources to be grouped together. For example, all vCloud Director VMs would have the same resource type, regardless of which VCD provider they came from. ResourceTypes may be hierarchical in which case the parentType can be set.</blockquote>
And in simple terms... It's how items are grouped in the left hand navigation when you select the items tab in the web console.

<!--more-->
## Why rename them?
When a customer deploys a Custom Resource the OOTB terminology used by vRA might not match the terminology used by the organization. I guess this is no biggy, but when you are trying to encourage end-user adoption it's important to make their experience as trouble-free as possible.. and if that means one less "what does this mean" question then you score a point!
## How do you do it?
<span style="color: #ff0000;">****Disclaimer: Don't do this against a production system.. The steps below haven't been fully tested and are just "proof of concept"!****</span>

It's not as hard as I thought it would be. Ten minutes looking through the API docs led me to catalog-service endpoint and I was able to get the job done by using a combination of the Admin API and Provider API.

The first thing to do is get a list of all resourceTypes. A good point to make here is that this will only return resourceTypes that vRA knows about. So if you haven't defined the Custom Resource that you want to change in Advanced Services > Custom Resources, then it wont show up.

Fire up your favorite REST client, <a href="http://grantorchard.com/vcac/concepts/vcac-6-1-api-authentication/" target="_blank">grab a bearer token</a> and execute a **GET** request to api/resourceTypes:

<code>https://vra-app.local/catalog-service/api/resourceTypes?limit=99999</code>

The response will be a list of resourceTypes the authenticated user has permissions to review.

You will need to grab the ParentType of the Custom Resource.. In this example I'm going to be using the Active Directory resourceType because that is what I had defined at the time.

<img class="alignnone wp-image-398 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/AD.png" alt="Rename resourceTypes in vRealize Automation" width="422" height="434" />

Now we need to execute a **PUT** request against the Provider API to update the resourceType.

The end point for this is /api/provider/resourceTypes/<typeId>. Where typeId in this case is **cs_AD**.

<code>https://vra-app.local/catalog-service/api/provider/resourceTypes/cs_AD</code>

The body of the request should be the resourceType definition that you got from the Admin API but with an updated name and description.

<img class="alignnone wp-image-399 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/PUT.png" alt="Rename resourceTypes in vRealize Automation" width="499" height="342" />

If the request is successful the response code should be **200 OK** and the response body will be the updated resourceType.

The next time that you log in to the web console and select the items tab, you should be able to see the renamed resourceType.

<img class="alignnone wp-image-400 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/Finished.png" alt="Rename resourceTypes in vRealize Automation" width="269" height="113" />