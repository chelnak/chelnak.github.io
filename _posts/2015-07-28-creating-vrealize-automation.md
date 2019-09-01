---
title: Creating a vRealize Automation Reservation with vRAAPIClient
date: 2015-07-28T14:33:00+00:00
author: Craig
layout: post
permalink: /2015/07/creating-vrealize-automation.html
categories:
  - vRealize Automation
tags:
  - API
  - REST
  - vCAC
  - vRA
---
<h2>Automating things that you work with is cool.</h2>
For those that know me in the IT world, you will know that I like to automate things.. well everything I can get my hands on. And with the impending career change I can only imagine that the things I get to automate are going to get even more interesting.

For a while now I've been working with vRealize Automation, and naturally it's API. As an exercise to try and understand a bit more about how the API works I decided to start <a href="http://vraapiclient.readthedocs.org/en/latest/">vRAAPIClient</a>.

With the addition of the reservation-service I thought it would be good to try and understand how it ticks and in turn add it to the project.

I've found that the best way to automate reservation creation and in fact a few other areas of vRA is to work from a template. In the following post we will create a reusable json payload that will allow us to quickly create new reservations.

There will be two parts to this post:
<ol>
* Creating a vRealize Automation Reservation with vRAAPIClient
* <a href="http://www.helloitscraig.co.uk/2015/07/creating-vrealize-automation_29.html">Creating a vRealize Automation Reservation with vRAAPIClient - Part 2: Jinja2 Templating</a>
</ol>
<span style="color: red;">*Disclaimer: The vRAAPIClient project is provided as is! Please don't run it in production without testing first*</span>
<!--more-->
<h3>Getting started</h3>
Lets start by creating a template reservation via the vRA web portal. This is going to be the gold master reservation and the one we use in this post. Lets call it **vRAAPIClient-GoldMaster-01**. Create a fresh one or copy from an existing. The whole point of this is that we have a strong reference to generate our json payload from later.

Before you continue take a fresh clone of vRAAPIClient and <a href="http://vraapiclient.readthedocs.org/en/latest/getting_started/">install it</a> if it's not already, or grab the contents of <a href="https://github.com/chelnak/vRAAPIClient/tree/master/examples/reservation/createReservations">examples/reservation/createReservations</a>.
<h3>**Edit globalconfig.py**</h3>
The globalconfig.py file is there just as a single location to put some common variables shared across the example scripts we will be using. If you don't want to use it, you can copy the contents in to each script and remove the import for it.

* **url: **Your vRA url (vra-01.company.com)
* **usr: **A fabric group administrator
* **passwd: **The above users password. *

* I always prefer to use <a href="https://docs.python.org/2/library/getpass.html">getpass </a>when dealing with passwords and python scripts. That way I don't have to think about removing/updating them.
<h3>Get the reservation id</h3>
Now that globalconfig.py is configured, lets look at getting the reservation id. Change directory to **examples/createReservations** and run the following:
```python getAllReservations.py```
The output should be similar to this:

<img class="alignnone" src="http://helloitscraig.co.uk/wp-content/uploads/2015/07/getAllReservations-img.png" alt="vRealize Automation Reservation" width="628" height="109" border="0" />

Grab the id of your template reservation, in this case it's **320ffda1-981e-4aac-a6c2-f0692e544b99**, and edit **createReservationTemplate.py**.

Now update the reservationId variable (line 19) with the id from the above step.

<img class="alignnone" src="http://helloitscraig.co.uk/wp-content/uploads/2015/07/createReservationTemplate-img.png" alt="vRealize Automation Reservation" width="576" height="86" border="0" />

Save and close the file.
<h3>Create a reusable reservation template</h3>
Run the following to create a json file containing your template reservation:
```python createReservationTemplate.py```
You should now have a file called **reservationTemplate.json** in your working directory.

Before we create the reservation we need to make two important changes to reservationTemplate.json.
<ol>
* Ensure that the name of the reservation is unique
* Remove the reservation Id from the bottom off the file. If this is not removed running **createReservation.py** will overwrite your template reservation!
</ol>
Open **reservationTemplate.json** and search for **name**. This will be the name of your new reservation. It **must **be unique.
<h3>Create a new reservation</h3>
Before I use a payload, I always like to validate it with a parser such as <a href="http://json.parser.online.fr/">this one</a>.

Once you have validated the contents of reservationTemplate.json, run the following:
```python createReservation.py```
The script will go off and do it's thing. Once it's finished it should return the new reservation id.

<img class="alignnone" src="http://helloitscraig.co.uk/wp-content/uploads/2015/07/reservationCreated-img.png" alt="vRealize Automation Reservation" width="467" height="18" border="0" />

You can confirm it's existence in the web portal too.

<img class="alignnone" src="http://helloitscraig.co.uk/wp-content/uploads/2015/07/reservationCreated-2-img.png" alt="vRealize Automation Reservation" width="257" height="40" border="0" />

The fun doesn't stop here either.. You can integrate <a href="http://jinja.pocoo.org/docs/dev/">JINJA2 </a>in to your **createReservation.py** script and **reservationTemplate.json** payload to make things a little more dynamic. This will hopefully be my next post.