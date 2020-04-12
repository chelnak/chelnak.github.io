---
title: 'PowervRA v1.5.0 - Improved support for the content-mangaement-service API'
date: 2016-12-16T12:35:45+00:00
author: Craig
layout: post
permalink: /2016/12/powervra-v1-5-0-improved-support-content-mangaement-service-api.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowervRA
  - vExpert
  - vRA7
---
With the release of PowervRA v1.5.0 we now have richer support for the content-management-service API. We've included some new functionality for viewing content and adjusted the naming scheme of some existing functions.

<!--more-->

The content-management-service set now includes:

* Get-vRAContent
* Get-vRAContentData
* Get-vRAContentType
* Get-vRAPackage
* New-vRAPackage
* Remove-vRAPackage
* Export-vRAPackage
* Test-vRAPackage

## Creating and exporting packages

`New-vRAPackage` now supports the addition multiple content types to a package. In the following example we use `Get-vRAContent` to return all property groups and composite blueprints. We then create a new package called Package01 that contains our content and export it to the local file system with `Export-vRAPackage`.

```powershell
$ContentIds = Get-vRAContent | ? {($_.ContentTypeId -eq "property-group") -or ($_.ContentTypeId -eq "composite-blueprint")} | Select-Object -ExpandProperty Id

New-vRAPackage -Name Package01 -ContentId $ContentIds

Export-vRAPackage -Name Package01 -Path C:\MyPackages
```

Note: This is not a breaking change, so the old functions still exist but are marked as deprecated and will be removed in a future release.
