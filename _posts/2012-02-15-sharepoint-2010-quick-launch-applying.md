---
title: 'SharePoint 2010 Quick Launch - Applying rounded corners with JQUERY'
date: 2012-02-15T12:22:00+00:00
author: Craig
layout: post
permalink: /2012/02/sharepoint-2010-quick-launch-applying.html
categories:
  - SharePoint
tags:
  - SharePoint
---
First things first, I am not saying that this is the right way to achieve this but it worked for me so I thought I'd document it.

Grab yourself a copy of jquery.corners from [here](http://malsup.github.com/jquery.corner.js) and upload it to where ever you are keeping your customisations.

Also be sure to follow this guy on twitter: [Mike Alsup](http://twitter.com/malsup)

<!--more-->

In this example I have a folder in Style Library with the following structure:

* Style Library/SiteCustomisations
* /css
* /js
* /images

It might be worth noting that I am also using one of the starter Master Pages created by [Randy Drisgll](http://blog.drisgill.com/). They can be downloaded [here](http://startermasterpages.codeplex.com/).

Okay, so make sure you have links in your Master Page to the jquery plugin and the jquery.corners plugin you have just uploaded. I like to link to an external copy of jquery.min for ease.

The two lines above can go between the ```<head></head>``` tags in your Master Page.
Just after these two links copy and paste the script below.

You will notice that the script references the #s4-leftpannel id. This is the id of the div that surrounds the quick launch. Now save, publish/approve your master page and look at the results.

Once the corners were sorted I needed to apply some custom CSS to the quick launch so it matched our brand. Here is what I used and the end result. (Again, this may not be the right/preferred way but it works for me.)

```PowerShell
body #s4-leftpanel{
 background-color: rgb(236,236,236);
 margin:15px 0px 0px 0px;
 }

.menu-item {
 border-top: 0px !important;
 color: #404040 !important;
}
```

Here is the end result:

![QuickLaunch](/assets/images/QuickLaunch-224x300.png)
