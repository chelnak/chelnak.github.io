---
title: Managing local vRA users with PowervRA
date: 2016-07-29T10:52:53+00:00
author: Craig
layout: post
permalink: /2016/07/managing-local-users-powervra.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowerShell
  - PowervRA
  - vExpert
  - vRA7
---
One of the current limitations with vRA7 is that once a local user has been created it <a href="https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2145439">can't be modified</a>.

Since v1.20 PowervRA has provided ability to interact with local user principals by using the following set of functions:

 * Get-vRAUserPrincipal
 * Set-vRAUserPrincipal
 * New-vRAUserPrincipal
 * Remove-vRAUserPrincipal

<!--more-->

In this post, i'm going to concentrate on **Set-vRAUserPrincipal**. The function enables you to configure the following attributes of a local user principal:

 * FirstName
 * LastName
 * EmailAddress
 * Description
 * Password

You can also enable and disable an account with the **DisableAccount** and **EnableAccount** switch parameters.

Here are some examples:
<h3>Modify account attributes</h3>
```Set-vRAUserPrincipal -Id user@vsphere.local -FirstName FirstName-Updated -LastName LastName-Updated -EmailAddress userupdated@vsphere.local -Description Description-Updated```
<h3>Enable and disable an account</h3>
```Set-vRAUserPrincipal -Id user@vsphere.local -EnableAccount
Set-vRAUserPrincipal -Id user@vsphere.local -DisableAccount
```
<h3>Reset the password of an account</h3>
```Set-vRAUserPrincipal -Id user@vsphere.local -Password s3cur3p@ss!```
**<em>**As always, make sure you test any new commands against your D&T environment first!**</em>**
<h3>Contributing</h3>
If you want to contribute a new function or have ideas/improvements head over to our <a href="https://github.com/jakkulabs/PowervRA/">github page</a> and let us know!