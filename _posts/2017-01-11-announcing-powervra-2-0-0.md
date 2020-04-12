---
title: Announcing PowervRA v2.0.0!
date: 2017-01-11T20:59:34+00:00
author: Craig
layout: post
permalink: /2017/01/announcing-powervra-2-0-0.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowerShell
  - PowervRA
  - vExpert
  - vRA7
---

Today, we are pleased to announce the release of [PowervRA v2.0.0](https://github.com/jakkulabs/PowervRA)!

One of the biggest changes in this release is support for PowerShell Core. I've got to tip my hat to the PowerShell team and the community members that have contributed for doing a sterling job so far. Considering the project is only in its alpha phase at the moment it's it pretty good shape!

In the following post I'm going to cover PowerShell Core support, some interesting news about Docker and try to give a bit of context around our module restructure. For a full list of changes, check out the [changelog](https://github.com/jakkulabs/PowervRA/blob/master/CHANGELOG.md)

<!--more-->

## PowerShell Core Support

Until 6.0.0-alpha.14 we were blocked on our PowerShell Core development as the method we used to handle untrusted certificates was not supported and Invoke-RestMethod did not have any sort of certificate bypass parameter.

We had previously relied on manually loading a .NET class when the initial connection was made but this method did not work in PowerShell Core. Luckily this was [resolved]("https://github.com/PowerShell/PowerShell/issues/1945) and the SkipCertificateCheck parameter was added to the PowerShell Core versions of Invoke-RestMethod and Invoke-WebRequest which allowed us to proceed with development for v2.0.0.

If anything, preparing for this release highlighted the importance of test driven development. Having a set of automated tests enabled us to quickly test changes we were making against multiple operating systems. I'm happy to say that 102 out of 103 functions are supported for PowerShell Core.

## Known Issues

Currently it appears that Invoke-WebRequest has an issue parsing some response content types. In our case, Get-vRAContentData returns a content type of text/yaml. This causes the following exception:

```
Unexpected character encountered while parsing value: U. Path '', line 0, position 0.
```

We noticed that the PowerNSX guys had faced a similar issue and implemented a pretty clever workaround but decided that as this issue only affects one function for us, the best course of action was to remove core support for it and wait for the issue to be fixed upstream.

Here is a link to the issue on the official PowerShell repository -> [https://github.com/PowerShell/PowerShell/issues/2245](ttps://github.com/PowerShell/PowerShell/issues/2245)

## Docker

There are two awesome things I want to mention here. The first is that PowervRA is now included in the official [PowerCLICore](https://github.com/vmware/powerclicore) docker image. This is cool because you can now have PowerCLI, PowervRA and PowerNSX up and running on any OS that supports docker in a matter of minutes. Big thanks to [Alan Renouf](https://twitter.com/alanrenouf) for including us in the official image!

You can grab the latest version of the image directly from docker hub:

```Bash
docker pull vmware/powerclicore
docker run --rm -it vmware/powerclicore
```

The second is the introduction of our own docker image. Our current image is based off VMwares Photon OS but the plan is to begin to expand on the different flavors we provide.

Adding support for PowerShell core means we are no longer just testing against Windows. We need to ensure PowervRA behaves as expected on multiple Operating Systems. Being able to rapidly provision containers for each supported OS and automatically invoke our tests is going to be extremely useful.

Then there is the case of unsupported Operating Systems. For example, at the time of writing this there is an [issue with PowerShell Core on CentOS sytems]("https://github.com/PowerShell/PowerShell/issues/2511). While PowervRA may not work naively on this OS, it's possible to install docker and fall back to our default Photon based image.

Our image is also available on docker hub:

```Bash
docker pull jakkulabs/powervra
docker run --rm -it jakkulabs/powervra
```

![docker](/assets/images/docker.png)

## Module Restructure

While this has no effect on the functionality of PowervRA we felt that staying organised was important. Especially the number of functions grows. We've now organised all public functions by service which gives us a better idea of our API coverage and makes the development process a little slicker.

![module-restructure](/assets/images/module-restructure.png)

As our development moves forward, the plan is to move towards the module layout suggested by [Microsoft's Plaster project](https://github.com/PowerShell/Plaster). If you haven't checked this out, I'd highly recommend it.

## What's Next

Keep your eye out for v2.1.0. I hear that there are more cool features on the way.
