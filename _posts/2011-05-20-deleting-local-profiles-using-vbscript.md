---
title: Deleting local profiles using VBscript
date: 2011-05-20T11:28:00+00:00
author: Craig
layout: post
permalink: /2011/05/deleting-local-profiles-using-vbscript.html
categories:
  - Windows
---

For those still using Windows XP here is a nice script that I used to use in a previous life to remove the masses of local profiles collected on our systems.

Obviously now with Windows Vista and 7 (in an enterprise environment) you can just set the GPO "**Computer Configuration/Administrative Templates/System/User Profiles/Delete user profiles older than a specified number of days on system restart**". Which makes all of our lives easier...

![GPO](/assets/images/GPO.png)

Here's the script anyway - I ran this locally on each machine but it can easily be deployed via GPO. Just make sure you are wise about when you deploy it as it could take a lot of time to process (depending on how many local profiles are on the system) and delay your users Logon experience.

<!--more-->

```vb
Const LocalDocumentsFolder = "C:\Documents and Settings"

set objFolder = objFSO.GetFolder(localdocumentsfolder)
on error resume next

for each fldr in objFolder.SubFolders
  if not isexception(fldr.name) then
    objFSO.DeleteFolder fldr.path, True
  end if
next

Function isException(byval foldername)
  select case foldername
    case "All Users"
      isException = True
    case "Default User"
      isException = True
    case "LocalService"
      isException = True
    case "NetworkService"
      isException = True
    case "Administrator"
      isException = True
    case Else
      isException = False
  End Select

End Function
```
