---
title: 'PowerShell - Creating Active Directory users from a CSV'
date: 2011-05-19T10:56:00+00:00
author: Craig
layout: post
permalink: /2011/05/powershell-creating-active-directory.html
categories:
  - PowerShell
---

It looks like I've been on a bit of a PowerShell trip this week (ha?) - I needed to quickly create about 50 temporary users so decided to push my old CreateUsers.VBS to one side and have a look at what PowerShell can do for me. After reading a few articles I came across this Blog by a guy called  [Josh Twist](http://www.thejoyofcode.com/Josh.aspx) and his post on creating user accounts in PowerShell (which was exactly what I was looking for).

<!--more-->

You can find the post [here](http://www.thejoyofcode.com/Creating_AD_user_accounts_in_PowerShell.aspx)

What I especially liked about this script is that it let you enable the accounts and set their passwords all within the foreach loop (not being much of a coder this excided me as I'd seen many examples that didn't include this)
Anyway, here is the code from josh's blog:

```powershell
$users = import-csv "C:usersToBeCreated.csv"
$container = [ADSI] "LDAP://cn=Users,dc=YourDomain,dc=local"
$users | foreach {
  $UserName = $_.UserName
  $newUser = $container.Create("User", "cn=" + $UserName)
  $newUser.Put("sAMAccountName", $UserName)
  $newUser.SetInfo()
  $newUser.psbase.InvokeSet('AccountDisabled', $false)
  $newUser.SetInfo()
  $newUser.SetPassword("P@55w0rd")
}
```

I definatly recomend making an effort to visit Josh's site [The Joy Of Code](http://www.thejoyofcode.com/) and if possible his [twitter page](http://twitter.com/joshtwist).
