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

## Automating things that you work with is cool

For those that know me in the IT world, you will know that I like to automate things.. well everything I can get my hands on. And with the impending career change I can only imagine that the things I get to automate are going to get even more interesting.

For a while now I've been working with vRealize Automation, and naturally it's API. As an exercise to try and understand a bit more about how the API works I decided to start [vRAAPIClient](http://vraapiclient.readthedocs.org/en/latest/).

With the addition of the reservation-service I thought it would be good to try and understand how it ticks and in turn add it to the project.

I've found that the best way to automate reservation creation and in fact a few other areas of vRA is to work from a template. In the following post we will create a reusable json payload that will allow us to quickly create new reservations.

There will be two parts to this post:

* Creating a vRealize Automation Reservation with vRAAPIClient
* [Creating a vRealize Automation Reservation with vRAAPIClient - Part 2: Jinja2 Templating](http://www.helloitscraig.co.uk/2015/07/creating-vrealize-automation_29.html)

> ⚠️ **Disclaimer**: The vRAAPIClient project is provided as is! Please don't run it in production without testing first

<!--more-->

## Getting started

Lets start by creating a template reservation via the vRA web portal. This is going to be the gold master reservation and the one we use in this post. Lets call it `vRAAPIClient-GoldMaster-01`. Create a fresh one or copy from an existing. The whole point of this is that we have a strong reference to generate our json payload from later.

Before you continue take a fresh clone of vRAAPIClient and [install it](http://vraapiclient.readthedocs.org/en/latest/getting_started/) if it's not already, or grab the contents of [examples/reservation/createReservations](https://github.com/chelnak/vRAAPIClient/tree/master/examples/reservation/createReservations).

### Edit globalconfig.py

The globalconfig.py file is there just as a single location to put some common variables shared across the example scripts we will be using. If you don't want to use it, you can copy the contents in to each script and remove the import for it.

* **url:** Your vRA url (vra-01.company.com)
* **usr:** A fabric group administrator
* **passwd:** The above users password
* I always prefer to use [getpass](https://docs.python.org/2/library/getpass.html) when dealing with passwords and python scripts. That way I don't have to think about removing/updating them.

### Get the reservation id

Now that globalconfig.py is configured, lets look at getting the reservation id. Change directory to `examples/createReservations` and run the following:

```
python getAllReservations.py
```

The output should be similar to this:

![getAllReservations](/assets/images/getAllReservations-img.png)

Grab the id of your template reservation, in this case it's `320ffda1-981e-4aac-a6c2-f0692e544b99`, and edit `createReservationTemplate.py`.

Now update the reservationId variable (line 19) with the id from the above step.

![createReservationTemplate](/assets/images/createReservationTemplate-img.png)

Save and close the file.

## Create a reusable reservation template

Run the following to create a json file containing your template reservation:

```
python createReservationTemplate.py
```

You should now have a file called `reservationTemplate.json` in your working directory.

Before we create the reservation we need to make two important changes to reservationTemplate.json.

* Ensure that the name of the reservation is unique
* Remove the reservation Id from the bottom off the file. If this is not removed running **createReservation.py** will overwrite your template reservation!

Open `reservationTemplate.json` and search for `name`. This will be the name of your new reservation. It **must **be unique.

## Create a new reservation

Before I use a payload, I always like to validate it with a parser such as [this one](http://json.parser.online.fr/).

Once you have validated the contents of reservationTemplate.json, run the following:

```
python createReservation.py
```

The script will go off and do it's thing. Once it's finished it should return the new reservation id.

![reservationCreated](/assets/images/reservationCreated-img.png)

You can confirm it's existence in the web portal too.

![reservationCreated](/assets/images/reservationCreated-2-img.png)

The fun doesn't stop here either.. You can integrate [JINJA2]("http://jinja.pocoo.org/docs/dev/) in to your `createReservation.py` script and `reservationTemplate.json` payload to make things a little more dynamic. This will hopefully be my next post.
