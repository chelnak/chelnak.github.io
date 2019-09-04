---
title: Requesting Basic Catalog Items with PowervRA
date: 2016-06-14T14:00:27+00:00
author: Craig
layout: post
permalink: /2016/06/requesting-catalog-items-powervra.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowervRA
  - vExpert
  - vRA7
---
Requesting a vRA catalog item is simple with PowervRA and can be achieved with the **Request-vRAConsumerCatalogItem** cmdlet. Here are a few examples using an imaginary catalog item called **centos**.

<!--more-->

## Basic Requests

To get going you will need the id of the catalog item that you want to request. If you don't already have it you can grab it with **Get-vRAConsumerCatalogItem**.

```PowerShell
$CatalogItemId = (Get-vRAConsumerCatalogItem -Name centos).Id
Request-vRAConsumerCatalogItem -Id $CatalogItemId
```

The above command will return the id of the request which can be retrieved with **Get-vRAConsumerRequest.**

![getrequest](/assets/images/getrequest.png)

## Wait

Alternatively, you can use the `Wait` switch. This will tell the cmdlet to wait until the request completes. Adding the `Verbose` switch to the mix will give you an idea what is going on behind the scenes.

```PowerShell
$CatalogItemId = (Get-vRAConsumerCatalogItem -Name centos).Id
Request-vRAConsumerCatalogItem -Id $CatalogItemId -Wait -Verbose
```

![request](/assets/images/request-1.png)

This can easily be condensed down in to a one liner:

```PowerShell
Request-vRAConsumerCatalogItem -Id (Get-vRAConsumerCatalogItem -Name centos).Id -Wait -Verbose
```

## Request Properties

**Request-vRAConsumerCatalogItem** currently provides the ability to interactively set the RequestedFor, Description and Reasons properties. However if you need to go one step further you can use **Get-vRAConsumerCatalogItemRequestTemplate. **This cmdlet will retrieve a JSON template containing all of the parameters needed to make the request. By using **Out-File** it can be saved to disk which enables you to make further customisations before submitting it.

```PowerShell
Get-vRAConsumerCatalogItemRequestTemplate -Name centos | Out-File requestTemplate.json
Get-Content -Path requestTemplate.json -Raw | Request-vRAConsumerCatalogItem
```
