---
title: Everything has a security descriptor
date: 2026-11-04T09:00:00+00:00
author: Craig
layout: post
permalink: /2026/11/everything-has-a-security-descriptor.html
categories:
  - Windows
tags:
  - Security
  - Permissions
---

In [the last post]({% post_url 2026-10-16-windows-permissions-give-me-a-headache %}), I looked at security descriptors on files. They also turn up on registry keys, processes, threads, services and named pipes. Even access tokens have them.

OK, "everything" is a bit of a stretch. Microsoft calls these **[securable objects](https://learn.microsoft.com/en-us/windows/win32/secauthz/securable-objects)**, meaning objects that can have a security descriptor.

<!--more-->

A [security descriptor](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors) holds an object's security information. This can include its owner, a DACL describing allowed and denied access, and a SACL containing auditing rules.

For example, we can use PowerShell's [Get-Acl](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-acl) to inspect a registry key:

```powershell
Get-Acl -Path 'HKCU:\Software' | Format-List Owner, Access
```

The output shows an owner and access rules, much as it would for a folder. The rights are different though. Here we're dealing with operations on registry keys, rather than reading or writing file data.

Each object type has its own specific rights. For a process, these include reading its memory or terminating it. Being allowed to do one doesn't automatically grant the other.

A process has both an access token and a security descriptor. The token describes the identity and privileges it runs with. The descriptor protects access to the process object itself.

When another program calls [OpenProcess](https://learn.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights), the requested rights are checked against the target process's DACL. Privileges and protected-process restrictions can also affect the result.

So the permissions on an executable file and the permissions on a running process are separate things. Allowing someone to read the executable doesn't give them permission to read a running instance's memory.
