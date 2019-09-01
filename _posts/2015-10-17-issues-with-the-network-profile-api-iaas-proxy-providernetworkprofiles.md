---
title: Issues with the Network Profile API (iaas-proxy-provider/network/profiles)
date: 2015-10-17T16:18:21+00:00
author: Craig
layout: post
permalink: /2015/10/issues-with-the-network-profile-api-iaas-proxy-providernetworkprofiles.html
categories:
  - vRealize Automation
tags:
  - vCAC
  - vRA
---
First of all, <a href="http://pubs.vmware.com/vra-62/index.jsp#com.vmware.vra.programming.doc/GUID-4666D184-559C-4704-9CA3-5A5FC0D2B844.html">the documentation</a> states that you should authenticate as a **Tenant Administrator** to work with this API. This wont work because it is the job of the **Fabric Administrator** to manage network profiles. You simply get a 403 response when trying to use any of the methods.

<img class="alignnone wp-image-446 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/403.png" alt="Network Profile" width="359" height="160" />

Judging from a conversation I had on twitter, it seems that <a href="https://twitter.com/PrashantCSS">Phrashant Chamarty</a> had already come across this.

But once you have authenticated with the right user most things appear to work...

<!--more-->
<h2>What works</h2>

* Retrieve the network profile
* Creating a new network profile
* Update network profile properties
* Update defined range properties

<h2>What doesn't work</h2>

* Updating a defined Address within a defined Range

I guess this is a fairly small issue but an interesting one none the less..

The idea of being able to consume a network profiles basic IPAM abilities with an advanced service is quite a neat one (in my opinion anyway).. it solves some issues.. especially if you don't have a central IPAM solution.

The process would involve getting a network profile, then grabbing the next available IP address within a defined range and updating it's state to ALLOCATED using the PUT method described <a href="http://pubs.vmware.com/vra-62/index.jsp#com.vmware.vra.programming.doc/GUID-3A2BF01A-35B4-4D83-AB4D-BCE5C96E1F61.html">here</a>.

As stated above you can update properties of the network profile and any defined range within it. However, when you try to update the defined addresses within a range, it will mess up the configuration of the network profile.

If you had any addresses allocated to resources already in this range, **these are wiped out**. It also appears that the addresses become disassociated with the range.

Looking in to the last point in a bit more detail, I discovered that a subsequent GET of the updated profile returns a valid description, however the defined addresses which were there before are gone!

<img class="alignnone wp-image-451 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/gone.png" alt="Network Profile" width="405" height="184" />

Digging in to the IaaS database shows that the what ever happens behind the scenes in the CAFE API is wiping out the StaticIPv4RangeID and I think the same is happening to the Hostname/VirtualMachineId too.

<img class="alignnone wp-image-450 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/sql.png" alt="Network Profile" width="704" height="117" />

What confuses me even more is that the API description for staticIPv4Address shows a lot more fields than what is returned.

<img class="alignnone wp-image-452 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/APIDescription.png" alt="Network Profile" width="812" height="424" />

Anyway - this was pretty much a post about nothing! Maybe it's a bug that is going to be fixed in a future release or this could even be handled completely differently in v7.

I'd be interested to hear if anyone has come across the same or similar issues. Get in touch via twitter if you have! :-)

&nbsp;