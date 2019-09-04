---
title: 'PowerShell - Deleting home directories from a list (CSV)'
date: 2011-05-18T12:27:00+00:00
author: Craig
layout: post
permalink: /2011/05/powershell-deleting-home-directories.html
categories:
  - PowerShell
---

Working in an environment where users are constantly coming and going can be a bit of a stress sometimes especially when it's housekeeping time! Luckily we have a warehouse that runs every night and updates our MIS systems with current user info.. We then export that information and do a bit of DSMOD trickery to separate old from new (Neanderthal I know but what can you do?).

Anyway, the problem was that we have never addressed the old user home directories when carrying out the above, leaving a back log and using up a fair bit of space. So i thought I'd give PowerShell a go and see how much scripting effort it would take to get rid and free up some much needed space.

<!--more-->

Deleting an Item using PowerShell is as easy as issuing the Remove-Item cmdlet and appending the location of the file that needs to be deleted. The thing is, I didn’t want to do this 3000 times so I used the Import-Csv cmdlet and imported the CSV file containing the Users Information to a variable in PowerShell ($dir). Combining this with a piped ForEach-Object control statement and the Remove-Item cmdlet enabled me to remove these directories with ease.

**This post assumes that:**

* You have a csv file named Users.csv
* There is a column in the CSV called Name (which will be the username or name of the directory you want removing)

Construct the csv file in the following format (Where UserX is your own data):

**Users.csv:**

```PowerShell
Name
User1
User2
User3
```

Save the CSV in the folder that holds the directories that are going to be moved and Open PowerShell as an administrator.

```PowerShell
$dir = Import-Csv Users.csv
$dir | ForEach-Object {$_."Name" | Remove-Item -Force -Recurse}
```
