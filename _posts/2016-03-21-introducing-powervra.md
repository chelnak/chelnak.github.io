---
title: Introducing PowervRA
date: 2016-03-21T15:12:09+00:00
author: Craig
layout: post
permalink: /2016/03/introducing-powervra.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowerShell
  - PowervRA
  - vExpert
  - vRA
---
In July 2015 I started work on&nbsp;<a href="https://github.com/chelnak/vRAAPIClient">vRAAPIClient</a>. The idea behind the project was to give me a better insight in to how to drive vRA via it's REST API. I&nbsp;learnt a lot about Python and about the application itself. &nbsp;However, work, life and other projects got in the way and as a result development stopped.

This left me with an itch that needed scratching. I wanted to do more with the API and maybe this time move my focus to a different language like PowerShell.&nbsp;After a conversation with colleague <a href="https://twitter.com/jonathanmedd/">Jonathan Medd</a>, it turned out that we had a similar idea. A community based PowerShell toolkit for vRA. Out of this came PowervRA.

For the first release,&nbsp;we have tried to focus on providing access to core functionality such as tenant, catalog and request management.&nbsp;The module currently contains 60 cmdlets and will keep growing as we add support for more features.
<h2>Getting involved</h2>
You can find the project on <a href="http://vexpert.me/PowervRA">GitHub</a>. If you have a cmdlet that you would like to add to a future release, <a href="https://help.github.com/articles/fork-a-repo/">fork</a>&nbsp;the and create a <a href="https://help.github.com/articles/creating-a-pull-request/">pull request</a>.
<iframe src="https://ghbtns.com/github-btn.html?user=jakkulabs&repo=PowervRA&type=fork&count=true" width="170px" height="20px" frameborder="0" scrolling="0"></iframe>

<!--more-->
<h2>Requirements</h2>

 * PowerShell 4 - Not tested with PowerShell 5, however we don't foresee any issues.
 * vRealize Automation 7.0 - Some functions may work with vRA 6.2, but this has not been tested.

<h2>Download</h2>
If you have PowerShell 5 installed, you can grab the module from the <a href="https://www.powershellgallery.com/" target="_blank">PowerShell Gallery</a>&nbsp;by running the following command:

```Install-Module -Name&nbsp;PowervRA```

If not, you can grab the latest release straight form the GitHub repository with this handy one liner:

```(new-object Net.WebClient).DownloadString("https://raw.githubusercontent.com/jakkulabs/PowervRA/master/Get-PowervRA.ps1") | iex```
<h2>Documentation</h2>
You can view help for any cmdlet from the PowerShell console with the Get-Help command:

```Get-Help -Name Get-vRAService```

Alternatively, you can head over to our&nbsp;<a href="http://powervra.readthedocs.org/" target="_blank">Read the Docs</a>&nbsp;site, where you will find documentation for each cmdlet in the current release.

https://readthedocs.org/PowervRA
<h2>Connecting to vRA</h2>
Before you get going you will need to connect to an instance of vRA. If you are using self signed certificates, ensure that you use&nbsp;the **IgnoreCertRequirements** switch.

```Connect-vRAServer -Server vra01.company.local -Tenant Tenant01 -Credential (Get-Credential) -IgnoreCertRequirements```

If successful&nbsp;the cmdlet will return information about your connection.

<img class="alignnone size-full wp-image-585" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/03/vraconnection.png" alt="PowervRA" width="840" height="109" />

You can view this information at anytime&nbsp;by calling the global variable **vRAConnection**:

```$GLOBAL:vRAConnection```
<h2>Example use case:&nbsp;Viewing the status of vRA system services</h2>
So lets say that you want to quickly check that all of the core vRA services are up and running or maybe even get a notification if a service goes down. You can do this with&nbsp;**Get-vRAApplianceServiceStatus.**

To list each service and it's current status run the following:

```Get-vRAApplianceServiceStatus | Select-Object Name, Status```

<img class="alignnone wp-image-574 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/03/Get-vRAApplianceServiceStatus-e1458224121579.png" alt="PowerVRA" width="505" height="397" />
<h2>Searching for failed services</h2>
To return service that may have failed to register, you can use **Where-Object** and query for status' that are **not equal** to REGISTERED. This could easily be incorporated in to a&nbsp;monitoring script and used to check the health of your vRA instance.

```Get-vRAApplianceServiceStatus | Where-Object {$_.Status -ne "REGISTERED"}```

<img class="alignnone wp-image-575 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/03/FailedService-e1458224026231.png" alt="FailedService" width="821" height="277" />

In the example above the **iaas-service** has failed. We can take a closer look at what is actually going on by examining the **ErrorMessage** property:

```
$Service = Get-vRAApplianceServiceStatus -Name iaas-service
$Service.ErrorMessage
```

<img class="alignnone size-full wp-image-576" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/03/error.png" alt="error" width="841" height="51" />