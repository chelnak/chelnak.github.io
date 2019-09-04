---
title: Using GithubReleaseManager to automate GitHub releases
date: 2017-03-27T13:00:26+00:00
author: Craig
layout: post
permalink: /2017/03/github_release_api_powershell.html
categories:
  - PowerShell
tags:
  - GitHub
  - PowerShell
---

GitHubReleaseManager is a PowerShell module that wraps up GitHub's [Releases API](https://developer.github.com/v3/repos/releases). It allows users to automate releases of their software by via the command line or by integrating the module in to build tools such as [PSake](https://github.com/psake/psake).

<!--more-->

## About

The idea came about while working on [another community project](https://github.com/jakkulabs/PowervRA/). Every release consisted of a number of manual tasks, one of which was publishing the release. While not complicated, it was always slightly tense for me as I wanted to ensure that all releases were consistent. The obvious solution was to automate this step and luckily, GitHub provide a really comprehensive API for managing releases. The module provides a way to create new releases and manage/update existing releases and assets.

In the future I will post more articles covering how to use each of the additional functions in the module.

## Installation

```PowerSHell
Install-Module -Name GitHubReleaseManager -Scope CurrentUser
```

## Supported PowerShell editions

* **Desktop:** 5.x
* **Core:** 6.0.0-Alpha

## Available functions

Release 1.1.1 contains 13 functions. 11 of those cover the endpoints exposed by GitHub's [Releases API](https://developer.github.com/v3/repos/releases).

![AvailableCommands](/assets/images/AvailableCommands.png)

Now that the introduction is out-of-the-way lets look at how we can use the module to create a release.

Before you start you'll need to create a [Personal Access Token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) with the following scopes:

* repo
* repo:status
* repo_deployment
* public_repo

**Note: Keep the token safe as you wont be able to view it again!**

Once you have generated the token use **Set-GitHubSessionInformation** to set up your session:

```PowerShell
Set-GitHubSessionInformation -Username user -APIKey xxxxxxxxxxxxxxxxxxx
```

You can view the current session configuration at any time with **Get-GitHubSessionInformation**.

Now that you have your session set up let's create a release against the Master branch of a repository:

```PowerShell
New-GitHubRelease -Repository TestRepository -Name TestRelease -Description "Test v1.0 release" -Target master -Tag v1.0
```

It's also possible to create a release and add one or more assets by using the Asset parameter. In GitHubReleaseManager an Asset is a hash table that contains two properties. The path to your binary and it's [content type](https://www.iana.org/assignments/media-types/media-types.xhtml).

In the example below we add a single Zip archive:

```PowerShell
$Asset @{
    "Path" = ".\Release\MyRepositoryAsset.zip"
    "Content-Type" = "application/zip"
}

New-GitHubRelease -Repository TestRepository -Name TestRelease -Description "Test v1.0 release" -Target master -Tag v1.0 -Asset $Asset
```

## Documentation

Further usage information and documentation for each function provided by the module can be found on the [GitHubReleaseManager ReadTheDocs site](http://githubreleasemanager.readthedocs.io/en/latest/").

## Future work

* Make the **Repository** parameter optional and allow the user to set the current repository with `Set-GitHubCurrentRepository`. This may set a property called CurrentRepository in the session object that is created with `Set-GitHubSessionInformation`
* Improve pipeline support. Currently each function requires the **Repository** parameter which makes it impossible to have a clean pipeline experience. Hopefully the change above will fix this
* Research different authentication options
* Improve CI/CD pipeline
