---
title: 'PowervRO - vRealize Orchestrator PowerShell Toolkit'
date: 2016-08-15T14:00:24+00:00
author: Craig
layout: post
permalink: /2016/08/vro-powershell-powervro.html
categories:
  - PowerShell
  - vRealize Orchestrator
tags:
  - PowerShell
  - PowervRO
  - vExpert
---
PowervRO aims to simplify interacting with vRO from the command line by providing a library of functions to help you do things like execute workflows and actions or import resources.

Release 1.0.0 includes 59 functions covering a number of services exposed by the API. Currently we support:

 * Actions-service
 * Category-service
 * Packages-service
 * Plugin-service
 * Resource-service
 * Service-descriptor-service
 * User-service
 * Workflow-run-service
 * Workflow-service

If you would like to see support for something that isn't listed above let us know over at <a href="http://vexpert.me/PowervRO">Github</a> or fork us and submit your own functions.

<iframe src="https://ghbtns.com/github-btn.html?user=jakkulabs&repo=PowervRO&type=fork&count=true" width="170px" height="20px" frameborder="0" scrolling="0"></iframe>

<!--more-->
<h2>Requirements</h2>

 * PowerShell 4 or 5
 * vRealize Orchestrator 6.1, 7.0 and 7.0.1

<h2>Download</h2>
If you have PowerShell 5 installed, you can grab the module from the <a href="https://www.powershellgallery.com/" target="_blank">PowerShell Gallery</a> by running the following command:
```Install-Module -Name PowervRO```
If not, you can grab the latest release straight from the GitHub repository with this one liner:
```(new-object Net.WebClient).DownloadString("https://raw.githubusercontent.com/jakkulabs/PowervRO/master/Get-PowervRO.ps1") | iex```
<h2>Documentation</h2>
You can view help for any cmdlet from the PowerShell console with the Get-Help command:
```Get-Help -Name Get-vROWorkflow```
Alternatively, you can head over to our <a href="http://powervro.readthedocs.org/" target="_blank">Read the Docs</a> site, where you will find documentation for each cmdlet in the current release.
<h2>Connecting to vRO</h2>
Before you start you'll need to initialise a connection to the vRO instance that you will be working with.  By default the cmdlet will try to connect on port 8281, however if you are using the embeded instance that comes with vRA 7 you will need to specify the **Port** parameter.

If you are using self signed certificates, ensure that you use the **IgnoreCertRequirements** parameter.
<h3>Default Port</h3>
```Connect-vROServer -Server vro.company.local -Credential (Get-Credential) -IgnoreCertRequirements```
<h3>Custom Port</h3>
```Connect-vROServer -Server vra.company.local -Port 443 -Credential (Get-Credential)```
If successful the cmdlet will return information about your connection.

<img class="alignnone wp-image-808 size-full" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/08/vROConnection.png" alt="PowervRO" width="610" height="99" />

You can view this information at anytime by calling the global variable **vROConnection**:
```$GLOBAL:vROConnection```
<h2>**Supported Authentication methods**</h2>
Currently PowervRO only supports basic authentication. However we suspect that this will be sufficient for the majority of use cases.

If you are using one of the other two authentication methods supported by vRO let us know!
<h2>Managing Resource Elements</h2>
One of my favorite features of PowervRO has to be support for the resource-service and more specifically the ability to import resource elements from a PowerShell session.

The following example imports a file called **locations.json** to the **Library** resource element category.

<img class="alignnone wp-image-811 size-full" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/08/locations.json_.png" alt="PowervRO" width="240" height="198" />

The first thing to do is get the Id of the category you want to use with **Get-vROCategory**. The **Root** parameter ensures that only top-level categories are returned.

<img class="alignnone wp-image-816 size-full" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/08/vRO-Cat.png" alt="PowervRO" width="871" height="70" />

Now we can import the resource element using the Id we got above, with the following command:
```Import-vROResourceElement -CategoryId ff8080815395ebe7015395ef60490000 -File .\locations.json```
If succesful the resource element should now exist under **Library\locations.json**.

<img class="alignnone wp-image-812 size-full" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/08/imported.png" alt="PowervRO" width="255" height="328" />