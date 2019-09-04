---
title: 'SharePoint 2010 - The Unattended Service Account Application ID is notspecified or has an invalid value.'
date: 2011-03-30T15:51:00+00:00
author: Craig
layout: post
permalink: /2011/03/sharepoint-2010-unattended-service.html
categories:
  - SharePoint
---

You recieve the following security error from SharePoint 2010 Central Admin:

* The Unattended Service Account Application ID is not specified or has an invalid value.

**Explanation:** "The Unattended Service Account is a single account that all documents can use to refresh data. It is required when connecting to data sources external to SharePoint, such as SQL. Without a valid Unattended Service Account Application ID, Visio Graphics Services will not be able to refresh Web Drawings that are connected to external data sources.
The rule for the Unattended Service Account Application ID failed. The ID does not exist. Visio Graphics Service"

TechNet article about Planning the Secure Service [here](http://technet.microsoft.com/en-us/library/ee806889.asp).

<!--more-->

To solve this the Secure Store Service needs to be provisioned and a target application needs to be created then the ID assigned to the Visio Graphics Service.

* Open Central Admin
* Navigate to Manage Service Applications and click on Secure Store Service Application
* Click on Generate New key from the ribbon
* Enter a strong passphrase and document it.
* Once the key has been generated click on New on the ribbon
* Enter the Target Application ID, Display Name, Contact E-mail.
* Set the Target Application Type to Group
* Click Next
* Accept the defaults on the Add field page
* Add the Administrators and members for the Target Application

Now enter the Application ID into the global settings section of the Visio Graphics Service.

* Go to Application Management then click on manage service applications
* Click on Visio Graphics Service and select Manage from the ribbon.
* Navigate into Global Settings and enter the previously set Target Application ID into the relivant field.

![Secure-Store](/assets/images/Secure-Store3.png)
