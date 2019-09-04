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
In July 2015 I started work on [vRAAPIClient](https://github.com/chelnak/vRAAPIClient). The idea behind the project was to give me a better insight in to how to drive vRA via it's REST API. Ilearnt a lot about Python and about the application itself. However, work, life and other projects got in the way and as a result development stopped.

This left me with an itch that needed scratching. I wanted to do more with the API and maybe this time move my focus to a different language like PowerShell.After a conversation with colleague [Jonathan Medd](https://twitter.com/jonathanmedd/), it turned out that we had a similar idea. A community based PowerShell toolkit for vRA. Out of this came PowervRA.

For the first release,we have tried to focus on providing access to core functionality such as tenant, catalog and request management.The module currently contains 60 cmdlets and will keep growing as we add support for more features.

## Getting involved

You can find the project on [GitHub](http://vexpert.me/PowervRA). If you have a cmdlet that you would like to add to a future release, [fork](https://help.github.com/articles/fork-a-repo/) the repo and create a [pull request]("https://help.github.com/articles/creating-a-pull-request/.
)
<iframe src="https://ghbtns.com/github-btn.html?user=jakkulabs&repo=PowervRA&type=fork&count=true" width="170px" height="20px" frameborder="0" scrolling="0"></iframe>

<!--more-->
## Requirements

* PowerShell 4 - Not tested with PowerShell 5, however we don't foresee any issues.
* vRealize Automation 7.0 - Some functions may work with vRA 6.2, but this has not been tested.

## Download

If you have PowerShell 5 installed, you can grab the module from the <a href="https://www.powershellgallery.com/" target="_blank">PowerShell Gallery</a>by running the following command:

```PowerShell
Install-Module -NamePowervRA
```

If not, you can grab the latest release straight form the GitHub repository with this handy one liner:

```PowerShell
(new-object Net.WebClient).DownloadString("https://raw.githubusercontent.com/jakkulabs/PowervRA/master/Get-PowervRA.ps1") | iex
```

## Documentation

You can view help for any cmdlet from the PowerShell console with the Get-Help command:

```PowerShell
Get-Help -Name Get-vRAService
```

Alternatively, you can head over to our [Read the Docs](http://powervra.readthedocs.org/) site, where you will find documentation for each cmdlet in the current release.

## Connecting to vRA

Before you get going you will need to connect to an instance of vRA. If you are using self signed certificates, ensure that you usethe **IgnoreCertRequirements** switch.

```PowerShell
Connect-vRAServer -Server vra01.company.local -Tenant Tenant01 -Credential (Get-Credential) -IgnoreCertRequirements
```

If successfulthe cmdlet will return information about your connection.

![vraconnection](/assets/images/vraconnection.png)

You can view this information at anytimeby calling the global variable **vRAConnection**:

```PowerShell
$GLOBAL:vRAConnection
```

## Example use case:Viewing the status of vRA system services

So lets say that you want to quickly check that all of the core vRA services are up and running or maybe even get a notification if a service goes down. You can do this with **Get-vRAApplianceServiceStatus.**

To list each service and it's current status run the following:

```PowerShell
Get-vRAApplianceServiceStatus | Select-Object Name, Status
```

![appliance-service-status](http://www.helloitscraig.co.uk/wp-content/uploads/2016/03/Get-vRAApplianceServiceStatus-e1458224121579.png)

## Searching for failed services

To return service that may have failed to register, you can use **Where-Object** and query for status' that are **not equal** to REGISTERED. This could easily be incorporated in to amonitoring script and used to check the health of your vRA instance.

```PowerShell
Get-vRAApplianceServiceStatus | Where-Object {$_.Status -ne "REGISTERED"}
```

![failed-service](/assets/images/FailedService-e1458224026231.png)

In the example above the **iaas-service** has failed. We can take a closer look at what is actually going on by examining the **ErrorMessage** property:

```PowerShell
$Service = Get-vRAApplianceServiceStatus -Name iaas-service
$Service.ErrorMessage
```

![error](/assets/images/error.png)
