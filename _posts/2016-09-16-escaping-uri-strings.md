---
title: Escaping URI Strings
date: 2016-09-16T16:08:01+00:00
author: Craig
layout: post
permalink: /2016/09/escaping-uri-strings.html
categories:
  - PowerShell
tags:
  - PowerShell
---
Recently I've found myself doing a lot of API queries with PowerShell. I often have a URI with a lot of query parameters and escaping them manually can be cumbersome and time-consuming.

To make life easier, I have started to use `[uri]::EscapeUriString(*string stringToEscape*)`. It takes one parameter, which is the string to escape. Here is an example to illustrate its usage:

<script src="https://gist.github.com/chelnak/5c11b61c10c3dc56af2130a0d66ef873.js"></script>

To reverse an escaped string you can use `[uri]::UnescapeDataString(*string stringToUnescape*)`.

## Update - 05/04/2017

An ![interesting issue](https://github.com/jakkulabs/PowervRA/issues/121) was raised on one of my community projects recently. A contributor pointed out that one of our functions did not work when you chose to filter by name and the string passed to the Name parameter contained an ampersand (&).

```powershell
Get-vRABusinessGroup -Name "Hello & Hello"
```

The REST API query was using a $filter parameter to return results where the name property was equal to the string passed to the Name parameter of the function. For example:

```
$URI = "/identity/api/tenants/$($TenantId)/subtenants?`$filter=name%20eq%20'Hello & Hello'"
```

In this case you should use **[uri]::EscapeDataString(string stringToEscape)**. This method will also escape special characters within a string. So & becomes %26 and allows the request to succeed.

<script src="https://gist.github.com/chelnak/3c8f01642c0c4a2beb43d7da5047bc8c.js"></script>
