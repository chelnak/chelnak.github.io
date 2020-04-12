---
title: Defining multiple Output Types in a function
date: 2017-03-21T13:30:22+00:00
author: Craig
layout: post
permalink: /2017/03/defining-multiple-output-types-powershell.html
categories:
  - PowerShell
tags:
  - PowerShell
---

Defining an Output Type for a function is a useful way to inform other users or tools about what to expect once the function has been executed.

While doing some research I came across the documentation for [the OutputType attribute](https://msdn.microsoft.com/en-us/powershell/reference/5.1/microsoft.powershell.core/about/about_functions_outputtypeattribute) and noticed that it's possible to set an Output Type per Parameter Set.

You can use the **ParameterSetName** property in the declaration. For example:

<!--more-->

```

[CmdletBinding(DefaultParameterSetName="A")]
[OutputType('[System.String]', ParameterSetName="A")]
[OutputType('[System.Array]', ParameterSetName="B")]

Param(

    [Parameter(Mandatory=$true, Position = 0, ParameterSetName="A")]
    [ValidateNotNullOrEmpty()]
    [String]$InputA,

    [Parameter(Mandatory=$true, Position=1, ParameterSetName="B")]
    [ValidateNotNullOrEmpty()]
    [String[]]$InputB
)
```

The OutputType property of Get-Command reflects each type specified above:

![OutputType](/assets/images/OutputType.png)

Personally,when designing a function, I always try to ensure that it has a single purpose and will only return a single type. However, in the case where this is unavoidable and you are using Parameter Sets to categorise your parameters this is a neat way to do the same with your Output Types.
