---
title: vRealize Automation Reservation Manager vRO package
date: 2015-10-19T13:52:17+00:00
author: Craig
layout: post
permalink: /2015/10/vrealize-automation-reservation-manager-vro-package.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vRA
  - vRealizeAutomation
  - vRO
---
A while ago I pushed [this package](https://flowgrab.com/project/view.xhtml?id=f09cf30b-a1ba-46bb-a471-f35f7147707c) to flow grab. It's called Reservation Manager and provides a way to create vRealize Automation reservations based on JSON templates.

![ReservationManager](/assets/images/ReservationManager-flows.png)

It uses the [vCACCAFERestClient](http://www.helloitscraig.co.uk/2015/10/how-to-use-vcaccaferestclient-in-the-vrealize-orchestrator-plug-in-for-vrealize-automation.html)scripting class provided by the vRA Orchestrator plug-in so requires no HTTP-REST host config and no additional authentication.

Functionality is still pretty basic but the following post outlines the function of each workflow in the package.

<!--more-->

## Reservation Manager Workflows

### Create a reservation template

#### Inputs

|Name|Type|
|--- |--- |
|vCACCAFEHost|vCACCAFE:vCACHost|
|reservationName|String|

#### Description

Generates a JSON template from an existing vRealize Automation Reservation and stores it as a resource element.

![createatemplate](/assets/images/createatemplate.png)

Setting the vCACCAFEHost will return a list of reservation names. Choose one from the drop-down list and click submit.

The resulting resource element will be stored under the Reservation Manager resource element category and prefixed with RM to make it easier to search for later.

### Create a reservation from template

#### Inputs

|Name|Type|
|--- |--- |
|vCACCAFEHost|vCACCAFE:vCACHost|
|template|ResourceElement|
|reservationName|String|
|businessGroup|vCACCAFE:BusinessGroup|

#### Outputs

|Name|Type|
|--- |--- |
|reservationId|String|

#### Description

Creates a new reservation in vRA from the JSON template stored as a resource element.

Select a template by searching for the resource element. Then enter a name and select a business group to associate with the new reservation.

Click submit to create the new reservation.

![reservation](/assets/images/resvra.png)

Currently the only fields that are updated during creation are **name** and **subtenantId.** However, you can easily set the value for any field in the template by editing the **Prepare Template** scriptable task.

![prepare](/assets/images/prepare.png)

The output will be the id of the new reservation.

### Delete a reservation

#### Inputs

|Name|Type|
|--- |--- |
|vCACCAFEHost|vCACCAFE:vCACHost|
|reservation|String|

#### Description

Deletes a reservation by name.

![deleteareservation](/assets/images/deleteareservation.png)

Setting the vCACCAFEHost will return a list of reservation names. Choose the reservation that you want to delete from the drop-down list and click submit.

## Conclusion

As I said above, the package can be downloaded from [flowgrab.com](https://flowgrab.com/project/view.xhtml?id=f09cf30b-a1ba-46bb-a471-f35f7147707c). Take it for a test drive. While it may not map exactly to what you are doing, it's good to see how other people do things.

Sharing is caring, right?
