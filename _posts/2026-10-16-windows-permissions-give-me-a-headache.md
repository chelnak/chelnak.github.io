---
title: Windows permissions give me a headache
date: 2026-10-16T09:00:00+01:00
author: Craig
layout: post
permalink: /2026/10/windows-permissions-give-me-a-headache.html
categories:
  - Windows
tags:
  - Security
  - Permissions
---

## Introduction

Before looking into Windows file permissions, I thought to myself: how hard can checking a box in a file's properties be?

But what actually happens when a program tries to open that file? Where does Windows look, and how does it decide whether to let us in?

For this post, I'm looking at the discretionary access control list, or **DACL**, and how Windows checks its entries when we request access to a file.

<!--more-->

## A file and a caller

Imagine I want to open a file to read and write its data. The file has a list of permissions allowing members of Readers to read it and members of Editors to write to it.

That list is the DACL. It lives in the file's [security descriptor](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors), alongside information such as who owns the file. Each entry is called an access control entry, or **ACE**, and specifies which rights a user or group is allowed or denied.

Windows uses an [access token](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens) to work out which entries apply to me. The token describes the security context of the code asking for access, including its user and groups. Normally this comes from the process, although a thread impersonating another user can use an impersonation token instead.

You can inspect your current access token, including your user identity, groups and privileges, with:

```powershell
whoami /all
```

Look at the user and group sections. Alongside the names, you'll see security identifiers, or **SIDs**. These are the identifiers Windows matches against entries in the DACL. The group attributes also matter: being listed in a token doesn't necessarily mean a group can grant access.

Our program also has to specify which rights it needs. For this example, we'll request just read data and write data; a real file open can ask for additional rights too.

## Following the ACEs

Let's say Readers and Editors are both enabled groups in my token. Here's our file's DACL, in the order Windows will read it:

| Entry | Who | Permission |
| --- | --- | --- |
| Allow | Readers | Read data |
| Allow | Editors | Write data |

During the [access check](https://learn.microsoft.com/en-us/windows/win32/secauthz/how-dacls-control-access-to-an-object), Windows walks the DACL, keeping track of the requested rights that still need to be granted:

```text
Requested: read data + write data
                |
Allow Readers: read data
Remaining: write data
                |
Allow Editors: write data
Remaining: none -> access granted
```

The Readers entry grants read access, but we also asked to write. Windows keeps going. The Editors entry grants that remaining right, and the request succeeds.

Notice that neither entry grants everything on its own. The allowed rights accumulate as Windows works through the list. If it reaches the end with rights still missing, access is denied. A matching deny entry for a right we still need also stops the check with a denial.

## Order changes the answer

Now let's add an entry denying write data to my user and put it at the start of the list. We're asking to write, so the request fails before Windows reaches either group entry.

This is where "deny always wins" gets a bit misleading.

Move that same deny entry after both allows. This time, the group entries grant everything we requested before Windows reaches the deny. The check has already finished.

Windows defines a [preferred, or canonical, order](https://learn.microsoft.com/en-us/windows/win32/secauthz/order-of-aces-in-a-dacl) for these entries. Explicit entries are set directly on the file; inherited entries come from its parent folders.

Explicit denies come before explicit allows, followed by inherited entries. Entries inherited from the parent folder come before those from the grandparent, and so on, with denies before allows at each level.

Our deny-at-the-end example breaks that preferred order. If you're building an ACL through low-level APIs, the order is something you need to get right.

Next time I'm trying to work out why access was denied, I'll have a few more things to check than the boxes in the properties window.
