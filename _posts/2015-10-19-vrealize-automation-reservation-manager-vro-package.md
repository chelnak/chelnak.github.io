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
A while ago I pushed <a href="https://flowgrab.com/project/view.xhtml?id=f09cf30b-a1ba-46bb-a471-f35f7147707c">this package</a> to flow grab. It's called Reservation Manager and provides a way to create vRealize Automation reservations based on JSON templates.

<img class="alignnone wp-image-411 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/ReservationManager-flows.png" alt="Automating vRealize Automation Reservation creation" width="228" height="74" />

It uses the <a href="http://www.helloitscraig.co.uk/2015/10/how-to-use-vcaccaferestclient-in-the-vrealize-orchestrator-plug-in-for-vrealize-automation.html">vCACCAFERestClient </a>scripting class provided by the vRA Orchestrator plug-in so requires no HTTP-REST host config and no additional authentication.

Functionality is still pretty basic but the following post outlines the function of each workflow in the package.


<!--more-->

<h1>**Reservation Manager Workflows**</h1>
<h2>Create a reservation template</h2>
<h3>Inputs</h3>
<table>
<tbody>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
<tr>
<td>vCACCAFEHost</td>
<td>vCACCAFE:vCACHost</td>
</tr>
<tr>
<td>reservationName</td>
<td>String</td>
</tr>
</tbody>
</table>
<h3>Description</h3>
Generates a JSON template from an existing vRealize Automation Reservation and stores it as a resource element.

<img class="alignnone wp-image-416 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/createatemplate.png" alt="Automating vRealize Automation Reservation creation" width="747" height="207" />

Setting the vCACCAFEHost will return a list of reservation names. Choose one from the drop-down list and click submit.

The resulting resource element will be stored under the Reservation Manager resource element category and prefixed with RM to make it easier to search for later.
<h2>Create a reservation from template</h2>
<h3>Inputs</h3>
<table>
<tbody>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
<tr>
<td>vCACCAFEHost</td>
<td>vCACCAFE:vCACHost</td>
</tr>
<tr>
<td>template</td>
<td>ResourceElement</td>
</tr>
<tr>
<td>reservationName</td>
<td>String</td>
</tr>
<tr>
<td>businessGroup</td>
<td>vCACCAFE:BusinessGroup</td>
</tr>
</tbody>
</table>
<h3>Outputs</h3>
<table>
<tbody>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
<tr>
<td>reservationId</td>
<td>String</td>
</tr>
</tbody>
</table>
<h3>Description</h3>
Creates a new reservation in vRA from the JSON template stored as a resource element.

<img class="alignnone wp-image-417 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/Createareservationfromtemplate.png" alt="Automating vRealize Automation Reservation creation" width="743" height="266" />

Select a template by searching for the resource element. Then enter a name and select a business group to associate with the new reservation.

Click submit to create the new reservation.

<img class="alignnone wp-image-419 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/resvra.png" alt="Automating vRealize Automation Reservation creation" width="498" height="119" />

Currently the only fields that are updated during creation are **name** and **subtenantId.** However, you can easily set the value for any field in the template by editing the **Prepare Template** scriptable task.

<img class="alignnone wp-image-423 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/prepare.png" alt="Automating vRealize Automation Reservation creation" width="661" height="331" />

The output will be the id of the new reservation.
<h2>Delete a reservation</h2>
<h3>Inputs</h3>
<table>
<tbody>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
<tr>
<td>vCACCAFEHost</td>
<td>vCACCAFE:vCACHost</td>
</tr>
<tr>
<td>reservation</td>
<td>String</td>
</tr>
</tbody>
</table>
<h3>Description</h3>
Deletes a reservation by name.

<img class="alignnone wp-image-418 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/10/deleteareservation.png" alt="Automating vRealize Automation Reservation creation" width="748" height="174" />

Setting the vCACCAFEHost will return a list of reservation names. Choose the reservation that you want to delete from the drop-down list and click submit.
<h2>Conclusion</h2>
As I said above, the package can be downloaded from <a href="https://flowgrab.com/project/view.xhtml?id=f09cf30b-a1ba-46bb-a471-f35f7147707c">flowgrab.com</a>. Take it for a test drive. While it may not map exactly to what you are doing, it's good to see how other people do things.

Sharing is caring, right?