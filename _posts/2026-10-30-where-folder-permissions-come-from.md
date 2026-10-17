---
title: Where did these folder permissions come from?
date: 2026-10-30T09:00:00+00:00
author: Craig
layout: post
permalink: /2026/10/where-folder-permissions-come-from.html
categories:
  - Windows
tags:
  - Security
  - Permissions
  - PowerShell
---

In [the last post]({% post_url 2026-10-16-windows-permissions-give-me-a-headache %}), I looked at how Windows walks a file's permission entries to decide whether to let us in. But some of those entries might be permissions I never set on that file.

The advanced security settings show an "Inherited from" column. Usually, it points at a parent folder.

But where do those entries actually live? Does Windows go back up the directory tree every time we open a file? And what happens when we click "Disable inheritance"?

<!--more-->

## Where the entry ends up

Imagine I have a folder called `project`. I want members of Readers to be able to read the folder and everything inside it, so I add a read permission applying to this folder, subfolders and files.

As before, that permission is an access control entry, or **ACE**, in the folder's discretionary access control list, or **DACL**. Because I set it directly on `project`, it's an explicit entry.

If the children allow inheritance, here's where that entry goes:

```text
project/               Explicit read entry for Readers
|-- notes.txt          Inherited read entry
`-- src/               Inherited read entry
    `-- main.rs        Inherited read entry
```

Windows [places inherited entries in each child's own ACL](https://learn.microsoft.com/en-us/windows/win32/secauthz/ace-inheritance-rules). So `main.rs` has an inherited Readers entry in its DACL. When Windows checks access to that file, the entry is already there.

## Files, folders or both?

How does Windows know that our Readers entry should reach both `notes.txt` and `src`? Each ACE has [flags controlling inheritance](https://learn.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-ace_header#members).

For files and folders, the two main ones are:

| Flag | Name | What it does |
| --- | --- | --- |
| `OI` | Object inherit | Passes the entry to files; subfolders can carry it onwards to their files |
| `CI` | Container inherit | Passes the entry to subfolders so it applies there too |

Our example uses both. That lets the permission pass to the files and subfolders inside `project`.

There are flags for applying an entry only to children or stopping it after one level too. We don't need those for this example; the [inheritance rules](https://learn.microsoft.com/en-us/windows/win32/secauthz/ace-inheritance-rules) cover the other combinations.

## Let's have a look

Let's inspect `src` with PowerShell. This assumes the folder and permissions from our example already exist; change the path to suit your machine. [`Get-Acl`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-acl) reads the permissions without changing them.

```powershell
$folder = 'C:\project\src'
$acl = Get-Acl -LiteralPath $folder

$acl.Access | Format-Table IdentityReference, AccessControlType,
    FileSystemRights, IsInherited, InheritanceFlags, PropagationFlags
```

Find the Readers entry in the output. On `src`, `IsInherited` should be `True`. Its `InheritanceFlags` should include `ContainerInherit` and `ObjectInherit`, allowing it to continue down to subfolders and files, including `main.rs`.

Now run the same command against `C:\project`. The Readers entry should have `IsInherited` set to `False`, because that's where we added it. It still has the flags allowing its children to inherit it.

That's why there are separate columns. One tells us where the entry came from; the others tell us where it can go next.

## What if I turn it off?

Now let's disable inheritance on `src`. That protects its DACL from changes inherited from `project`. What happens to the entries already on `src`?

The permissions dialog gives us two choices: convert those inherited entries into explicit ones, or remove them. The API exposes the same distinction through [access-rule protection](https://learn.microsoft.com/en-us/dotnet/api/system.security.accesscontrol.objectsecurity.setaccessruleprotection).

If I convert them, the Readers entry stays on `src`, but it's now explicit. In our example, Readers still has read access. Changing the Readers entry on `project` won't update this one through inheritance.

If I remove them, the inherited Readers entry goes away. That doesn't automatically mean nobody can read the folder. There may be other entries granting access, so we still need to look at the resulting DACL.

Protecting `src` from its parent doesn't switch off inheritance on `main.rs`. Entries on `src` can still pass down if their flags allow it and the child accepts inheritance.

We can check whether `src` is protected by reading its ACL again:

```powershell
(Get-Acl -LiteralPath 'C:\project\src').AreAccessRulesProtected
```

After disabling inheritance, this returns `True`, whether we kept the entries or removed them.

So the permission I never added to `main.rs` really does live on that file. It got there through `project` and `src`. The "Inherited from" column makes a bit more sense now.
