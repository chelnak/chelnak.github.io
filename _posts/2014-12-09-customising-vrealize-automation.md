---
title: 'Customising vRealize Automation notification emails - LeaseAboutToExpire.xslt'
date: 2014-12-09T15:03:00+00:00
author: Craig
layout: post
permalink: /2014/12/customising-vrealize-automation.html
categories:
  - vRealize Automation
tags:
  - vCAC
  - vRA
---
To cut a long story short, I needed to customise the email body for the **Lease About To Expire** scenario. The content was very basic and it the short date it contained was in the wrong format (for my environment).

vRA email templates are split between the virtual appliance, which uses Apache Velocity templates and the IAAS host which currently uses XSLT stylesheets.

<!--more-->

The template for this email is on the IAAS host in the following directory:
```%systemdrive%Program Files(x86)VMwarevCACServerTemplates```
The file that needs editing is: **LeaseAboutToExpire.xslt**

Take a back up the Templates folder before you change any of the xslt files inside. It's better to be safe than sorry and this will mean that if you get into a mess you can just replace the broken stylesheet with the old working on.

You might want to scan over **[this document](http://pubs.vmware.com/vCAC-61/index.jsp?topic=%2Fcom.vmware.vcac.system.administration.doc%2FGUID-DAB61D8B-797F-4CF4-B55D-0C47A2DF2EF5.html)** before you start too. It's contains a list of objects that are available to pull in to your stylesheet.

## Editing the stylesheet

If you open up an unedited version of LeaseAboutToExpire.xslt you'll notice that **VirtualMachineEx/Expires** is called with the substring-before function:

```PowerShell
<xsl:value-of select="substring-before(//VirtualMachineEx/Expires, 'T')>
```

This will return **2012-12-09**.

The complete output of this object is **2014-12-09T13:45:00.25**

In the customised email I wanted to include the full output of `VirtualMachineEx/Expires` but display the short date in UK format and the time separately.

So to do this I used the [<xsl:variable>](http://www.w3schools.com/xsl/el_variable.asp) element and the [substring function](http://www.xsltfunctions.com/xsl/fn_substring.html). It's worth noting though, the first character will be at position 1, not 0 like we are usually used to.

I've included a [gist](https://gist.github.com/chelnak/7d92a75161f817d72dd4") below to give an idea of how I did it:

<script src="https://gist.github.com/chelnak/7d92a75161f817d72dd4.js"></script>
