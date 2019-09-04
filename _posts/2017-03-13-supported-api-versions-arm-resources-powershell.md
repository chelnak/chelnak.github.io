---
title: Quickly list supported API versions for ARM resource types
date: 2017-03-13T13:05:56+00:00
author: Craig
layout: post
permalink: /2017/03/supported-api-versions-arm-resources-powershell.html
categories:
  - Azure
  - PowerShell
tags:
  - Azure
  - PowerShell
---

One of the things that I found the most challenging when learning how to create Resource Manager templates was trying to understand which API versions to use for my resources. The [documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-supported-services#supported-api-versions) is pretty clear and states that most of the time we should be aiming for the latest API version. It also contains examples showing how to get the information. For example:

```PowerShell
((Get-AzureRmResourceProvider -ProviderNamespace Microsoft.Web).ResourceTypes | Where-Object ResourceTypeName -eq sites).ApiVersions
```

<!--more-->

Excellent.. but copying and editing the code every time I wanted to retrieve some information was time-consuming. So to make things easier I threw together a small function that lives in my PowerShell profile. It will return a list of current supported API versions for given resource type (just like the code above). However the main difference is that when I need to query a resource I can just run the following command in my session:

```PowerShell
Get-AzureRMResouceTypeAPIVersion -ProviderNamespace "Microsoft.Network" -ResourceTypeName "loadBalancers"
```

![api](/assets/images/api.png)

Here is the code:

<script src="https://gist.github.com/chelnak/161e4e3864584e3ff2aa3daf6ef33692.js"></script>

While the function is nothing special, it demonstrates how building your own tools around existing functionality can speed up your learning and development processes.
