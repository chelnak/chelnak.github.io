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

GitHubReleaseManager is a PowerShell module that wraps up GitHub's <a href="https://developer.github.com/v3/repos/releases">Releases API</a>. It allows users to automate releases of their software by via the command line or by integrating the module in to build tools such as <a href="https://github.com/psake/psake">PSake</a>.
<h2>About</h2>
The idea came about while working on <a href="https://github.com/jakkulabs/PowervRA/">another community</a> project. Every release consisted of a number of manual tasks, one of which was publishing the release. While not complicated, it was always slightly tense for me as I wanted to ensure that all releases were consistent. The obvious solution was to automate this step and luckily, GitHub provide a really comprehensive API for managing releases. The module provides a way to create new releases and manage/update existing releases and assets.

In the future I will post more articles covering how to use each of the additional functions in the module.

<!--more-->
<h2>Installation</h2>
```Install-Module -Name GitHubReleaseManager -Scope CurrentUser```
<h2>Supported PowerShell editions:</h2>

 * **Desktop:** 5.x
 * **Core:** 6.0.0-Alpha

<h2>Available functions</h2>
Release 1.1.1 contains 13 functions. 11 of those cover the endpoints exposed by GitHub's <a href="https://developer.github.com/v3/repos/releases">Releases API</a>.

<img class="alignnone wp-image-936 size-full" title="GitHub" src="https://www.helloitscraig.co.uk/wp-content/uploads/2017/01/AvailableCommands.png" alt="GitHub" width="895" height="299" />
<h2>Creating a release</h2>
Now that the introduction is out-of-the-way lets look at how we can use the module to create a release.

Before you start you'll need to create a <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">Personal Access Token</a> with the following scopes:

 * repo

 * repo:status
 * repo_deployment
 * public_repo



<em>**Note: Keep the token safe as you wont be able to view it again!**</em>

Once you have generated the token use **Set-GitHubSessionInformation** to set up your session:
```Set-GitHubSessionInformation -Username user -APIKey xxxxxxxxxxxxxxxxxxx```
You can view the current session configuration at any time with **Get-GitHubSessionInformation.**

Now that you have your session set up let's create a release against the Master branch of a repository:
```New-GitHubRelease -Repository TestRepository -Name TestRelease -Description "Test v1.0 release" -Target master -Tag v1.0```
It's also possible to create a release and add one or more assets by using the Asset parameter. In GitHubReleaseManager an Asset is a hash table that contains two properties. The path to your binary and it's <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">content type</a>.

In the example below we add a single Zip archive:
```$Asset @{
    "Path" = ".\Release\MyRepositoryAsset.zip"
    "Content-Type" = "application/zip"
}

New-GitHubRelease -Repository TestRepository -Name TestRelease -Description "Test v1.0 release" -Target master -Tag v1.0 -Asset $Asset```
<h2>Documentation</h2>
Further usage information and documentation for each function provided by the module can be found on the <a href="http://githubreleasemanager.readthedocs.io/en/latest/">GitHubReleaseManager ReadTheDocs site</a>.
<h2>Future work</h2>

 * Make the **Repository **parameter optional and allow the user to set the current repository with **Set-GitHubCurrentRepository.** This may set a property called CurrentRepository in the session object that is created with **Set-GitHubSessionInformation**
 * Improve pipeline support. Currently each function requires the **Repository **parameter which makes it impossible to have a clean pipeline experience. Hopefully the change above will fix this
 * Research different authentication options
 * Improve CI/CD pipeline
