---
title: Managing Reservations With PowervRA
date: 2016-04-19T13:29:40+00:00
author: Craig
layout: post
permalink: /2016/04/managing-reservations-powervra.html
categories:
  - PowerShell
  - vRealize Automation
tags:
  - PowervRA
  - vExpert
  - vRA7
---
Since the initial release of PowervRA I've been busy hacking away at bug fixes, improvements and new features. One that we were keen to get out of the door was support for reservations. The reservation-service API is a mammoth and even though I'd had a fair battles with it in the past, I underestimated the challenges involved in getting support in to the module.

I'm pleased to announce though that version 1.1.0 introduces support for managing vSphere and vCloud Air reservations. Here's how to get started:

<!--more-->

## Retrieving all reservations

To view all reservations you can use **Get-vRAReservation**. Optionally you can use the Name parameter to get a single reservation

```PowerShell
Get-vRAReservation
Get-vRAReservation | Select-Object Name
Get-vRAReservation -Name Reservation01
```

The command behaves like any other Get command, with the exception of the Limit and Page parameters. By default all pages will be returned but you have the option to specify the page and the number of results per page.

## Creating a new reservation

There is a bit of leg work involved in creating a new reservation... but it's worth it.

First you will need to get the compute resource that you want to  use in the new reservation:

```PowerShell
$ComputeResource = Get-vRAReservationComputeResource -Type vSphere -Name "Cluster01 (vCenter)"
```

Next up, you need to define the storage and networks that you want to use. Using networks as an example. Start by creating a new array, then creating a new definition for each network that we want to utilise and add it to the array. This array can then be passed to the New-vRAReservation command later.

```PowerShell
# --- Get the network definition
$NetworkDefinitionArray = @()
$Network1 = New-vRAReservationNetworkDefinition -Type vSphere -ComputeResourceId $ComputeResource.Id -NetworkPath "VM Network" -NetworkProfile "Test" -Verbose
$NetworkDefinitionArray += $Network1
```

```PowerSHell
# --- Get the storage definition
$StorageDefinitionArray = @()
$Storage1 = New-vRAReservationStorageDefinition -Type vSphere -ComputeResourceId $ComputeResource.Id -Path "NFS001" -ReservedSizeGB 10 -Priority 0 -Verbose
$StorageDefinitionArray += $Storage1
```

Finally, using a bit of <a href="https://technet.microsoft.com/en-us/magazine/gg675931.aspx" target="_blank">splatting</a>, we gather all of the information needed and create the new reservation.

```PowerShell
$Param = @{
Type = "vSphere"
Name = "Reservation20"
Tenant = "Tenant01"
BusinessGroup = "Default Business Group[Tenant01]"
ReservationPolicy = "ReservationPolicy1"
Priority = 0
ComputeResourceId = $ComputeResource.Id
Quota = 0
MemoryGB = 20
Storage = $StorageDefinitionArray
Resourcepool = "Resources"
Network = $NetworkDefinitionArray
EnableAlerts = $true
StorageAlertPercentageLevel = 20
EmailBusinessGroupManager = $true
AlertRecipients = "testuser@vsphere.local"
}

New-vrareservation @Param
```

If successful, the cmdlet will return the new reservation.

![new-reservation](/assets/images/new-reservation.png)

At this point, it's also worth pointing out the first parameter in the list, **Type**. This defines the type of reservation you are going to create. As of version 1.1.0, PowervRA only supports **vSphere** and **vCloud Air** reservations. Support for more types will hopefully be added in later versions.

> Quick tip: To view a list of all types supported by vRA you can use **Get-vRAReservationType | Select-Object Name**

In [this gist](https://gist.github.com/chelnak/863c61425685e87ca060f27295c3dafa) you will find a few examples for creating vSphere and vCloud Air reservations.

## Copying an existing reservation

If you want to duplicate an existing reservation you can use **Get-vRAReservationTemplate** along with **New-vRAReservation**.

```PowerShell
Get-vRAReservation -Name Reservation20 | Get-vRAReservationTemplate | New-vRAReservation -NewName CopiedReservation01
```

Alternatively, you can save the template to a text file for use elsewhere.

```PowerShell
Get-vRAReservation -Name Reservation20 | Get-vRAReservationTemplate -OutFile C:\Reservations\Reservation.json
```

## Removing a reservation

Removing a reservation is simple. You can use **Get-vRAReservation** and pipe it to **Remove-vRAReservation**.

```PowerSHell
Get-vRAReservation -Name Reservation20 | Remove-vRAReservation
```

## Updating a reservation

Updating a reservation comes in a few different parts. We decided it would be best to split out storage and network again due to the complex nature of the underlying objects.

To update the core properties of a reservation you can use **Set-vRAReservation**.

```PowerShell
Get-vRAReservation -Name Reservation20 | Set-vRAReservation -Name Reservation20-Updated
```

If successful the cmdlet will return the updated reservation.

![updated-reservation](/assets/images/updated-reservation.png)

## Managing storage

So for managing the storage associated with a reservation we have **Add-vRAReservationStorage** and **Set-vRAReservationStorage**.

**Set-vRAReservationStorage** will update properties of a datastore that is currently associated with a reservation.

```PowerShell
Get-vRAReservation -Name "Reservation01" | Set-vRAReservationStorage -Path "Datastore01"  -ReservedSizeGB 20 -Priority 10
```

**Add-vRAReservationStorage** will add new storage to a reservation.

```PowerShell
Get-vRAReservation -Name Reservation01 | Add-vRAReservationStorage -Path "Datastore01" -ReservedSizeGB 500 -Priority 1
```

## Managing networks

For managing networks, we have **Set-vRAReservationNetwork** and **Add-vRAReservationNetwork**.

**Set-vRAReservationNetwork** will update the network profile of an associated network.

```PowerShell
Get-vRAReservation -Name "Reservation01" | Set-vRAReservationNetwork -NetworkPath "VM Network" -NetworkProfile "Test Profile 1"
```

To remove a network profile you can pass an empty string to the NetworkProfile parameter.

```PowerShell
Get-vRAReservation -Name "Reservation01" | Set-vRAReservationNetwork -NetworkPath "VM Network" -NetworkProfile ""
```

**Add-vRAReservationNetwork** will add a new network  to a reservation and optionally associate a network profile.

```PowerShell
Get-vRAReservation -Name Reservation01 | Add-vRAReservationNetwork -NetworkPath "DMZ" -NetworkProfile "DMZ-Profile"
```

As a final note. Don't forget that you can check out the help associated with a cmdlet if you get stuck.

```PowerShell
Get-Help -Name Get-vRAReservation -Full
```
