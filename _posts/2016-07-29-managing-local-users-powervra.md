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
One of the current limitations with vRA7 is that once a local user has been created it [can't be modified](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2145439).

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

You can also enable and disable an account with the `*DisableAccount` and `EnableAccount` switch parameters.

Here are some examples:

## Modify account attributes

```powershell
Set-vRAUserPrincipal -Id user@vsphere.local -FirstName FirstName-Updated -LastName LastName-Updated -EmailAddress userupdated@vsphere.local -Description Description-Updated
```

## Enable and disable an account

```powershell
Set-vRAUserPrincipal -Id user@vsphere.local -EnableAccount
Set-vRAUserPrincipal -Id user@vsphere.local -DisableAccount
```

## Reset the password of an account

```powershell
Set-vRAUserPrincipal -Id user@vsphere.local -Password s3cur3p@ss!
```

*As always, make sure you test any new commands against your D&T environment first!*

## Contributing

If you want to contribute a new function or have ideas/improvements head over to our [github page](https://github.com/jakkulabs/PowervRA/) and let us know!
