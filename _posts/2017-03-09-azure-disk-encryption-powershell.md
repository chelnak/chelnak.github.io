---
title: Automating Azure Disk Encryption with PowerShell
date: 2017-03-09T13:00:29+00:00
author: Craig
layout: post
permalink: /2017/03/azure-disk-encryption-powershell.html
categories:
  - Azure
  - PowerShell
tags:
  - Azure
  - PowerShell
---
While studying for the <a href="https://www.microsoft.com/en-gb/learning/exam-70-533.aspx">70-533</a> exam I decided to take a deep dive in to the Disk encryption feature provided by Azure. Azure Disk Encryption uses BitLocker for Windows or DM-Crypt for Linux enabling users to encrypt OS and data disks of Azure Virtual Machines.

It turns out that it's not just as simple as flicking a switch to get encryption up and running. The service is tied in with Azure Active Directory and Key Vault too. After manually running through the set up a few times I decided to put together a proof of concept script based on client-secret authentication. It's worth noting that certificate-based authentication is also supported.

<!--more-->

The high level steps are as follows:

 * Create a Key Vault that is enabled for disk encryption
 * Create an Azure Active Directory application and associated service principal
 * Create a Key Vault access policy and grant the Azure AD application access
 * Configure the VM Disk Encryption Extension

<script src="https://gist.github.com/chelnak/c9927cad3fbd61e5fc50263ed31374cd.js"></script>

Once the script completes both OS and data disks should be enabled for encryption.

<img class="alignnone size-full wp-image-956" src="https://www.helloitscraig.co.uk/wp-content/uploads/2017/03/diskencryption.png" alt="Azure Disk Encryption" width="169" height="204" />
<h2>References</h2>
The official docs are pretty decent for getting started. I also referenced Sudhakar Evuri's posts on disk encryption and PowerShell.

 * <a href="https://docs.microsoft.com/en-us/azure/security/azure-security-disk-encryption">https://docs.microsoft.com/en-us/azure/security/azure-security-disk-encryption</a>
 * <a href="https://blogs.msdn.microsoft.com/azuresecurity/2015/11/16/explore-azure-disk-encryption-with-azure-powershell/">https://blogs.msdn.microsoft.com/azuresecurity/2015/11/16/explore-azure-disk-encryption-with-azure-powershell/</a>
 * <a href="https://blogs.msdn.microsoft.com/azuresecurity/2015/11/21/explore-azure-disk-encryption-with-azure-powershell-part-2/">https://blogs.msdn.microsoft.com/azuresecurity/2015/11/21/explore-azure-disk-encryption-with-azure-powershell-part-2/</a>
