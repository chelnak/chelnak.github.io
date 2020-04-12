---
title: 'Creating a vRealize Automation Reservation with vRAAPIClient - Part 2: Jinja2 Templating'
date: 2015-07-29T12:58:00+00:00
author: Craig
layout: post
permalink: /2015/07/creating-vrealize-automation_29.html
categories:
  - vRealize Automation
tags:
  - API
  - REST
  - vCAC
  - vRA
---
So it looks like this post has accidentally become part two of a two post series. I would recommend going through the first post before this one as it will probably fill in some gaps.

* [Creating a vRealize Automation Reservation with vRAAPIClient](http://www.helloitscraig.co.uk/2015/07/creating-vrealize-automation.html)
* Creating a vRealize Automation Reservation with vRAAPIClient - Part 2: Jinja2 Templating

Resources for this post can be found in [examples/reservation/createReservationJinja2](https://github.com/chelnak/vRAAPIClient/tree/master/examples/reservation/createReservationsJinja2.py).

This post extends the idea of reusable reservation templates by adding [Jinja2](http://jinja.pocoo.org/) in to the mix.

Jinja2 allows us to adapt our existing `reservationTemplate.json` file so it can be used to create multiple reservations without having to play with the file every time we need to make a change. In my opinion, there is nothing worse than debugging json, so if you can get it right once and never have to touch it again, bonus points!

The following example is pretty basic and we will only be working with `name` and `subtenantId` but hopefully by the end of the post you will get the idea.

<!--more-->

## Getting started

Before we start you'll need to grab a copy of Jinja2 and make sure that you have all of the files from [github](https://github.com/chelnak/vRAAPIClient).

Fire up your [virtualenv](https://virtualenv.pypa.io/en/latest/) (if you are using one) and run:

```
pip install jinja2
```

### Edit globalconfig.py

As stated before, the globalconfig.py file is just a single location to store some common variables. If you don't want to use it, you don't have to. Just copy the contents in to each script and remove the import for it.

**url:** Your vRA ur (vra-01.company.com)
**usr:** A fabric group administrator
**passwd:** The above users password

### Get the subtenant id

As mentioned above, one of the values we will be substituting is `subTenantId`. This is the id of the business group that the reservation will be linked to.

To get a list of business groups along with their id's, use `getAllBusinessGroups.py`.

Change directory to **examples/reservation/createReservationsJinja2 **and run the following:

```
python getAllBusinessGroups.py
```

It should return something similar to this:

![getAllReservations](/assets/images/getAllReservations-img.png)

Copy the id of the business group and paste it somewhere safe.

### Prepare reservationTemplate.json

You can use the **reservaitonTemplate.json** file that we created in [part 1](/2015/07/creating-vrealize-automation.html) creating-vrealize-automation. or create a new one. It's up to you.

Once you have your file, copy it over to `examples/reservation/createReservationsJinja2`, if it's not already there, and open it up for editing.

As I mentioned above, this time we will be looking to dynamically set the name of the reservation and the business group it is linked to.

In the file, find `name` and replace the value with `"{{ params.ReservationName }}"`. Now in the same block replace the value of `subTenantId` with `{{ params.SubTenantId }}"`.

The final result should look like this:

![jinjaReservations](/assets/images/jinjaReservations-img.png)

Make sure you double check your formatting and that all commas are where they should be before saving.

### Create a new reservation

Now that we have our template set up we can move on to creating the reservation. You'll notice that contents of `createReservation.py` is slightly different to the one we used in the previous post.

This time we:

* Import Environment and FileSystemLoader from the jinja2 module
* Get the current directory
* Set up the jinja2 environment
* Create a new dict called params, which contains the values that we want to include in the template
* Render the payload
* Create the reservation

Update params with your desired values. `ReservationName` must be unique and `SubTenantId` is the id we got from running `getAllBusinessGroups.py`.

![jinjaparams](/assets/images/jinjaparams-img.png)

Save and close the file and run the following:

```
python createReservation.py
```

The script will return the new reservations id:

![reservationcreated](/assets/images/reservationcreated-img.png)

To push things a litter further, why not incorporate [argparse](https://docs.python.org/3/library/argparse.html) and create a cli tool. Take a look at this example (also found in [examples/createReservationJinja2](https://github.com/chelnak/vRAAPIClient/tree/master/examples/createReservationsJinja2)). The syntax for this would be similar to this:

* **-n / --reservationName:** Name of the reservation
* **-s / --subTenantId:** Business group id
* **-u / --user:** fabric administrator
* **-p / --password:** password for the above user
* **--url:** vRA appliance url

**If password is not specified, you will be prompted.**

```
python createReservation-cli.py -n 'test-res-cli' -s 'ad0073e7-401f-4a39-ac84-519a891a13ff' -u 'fabric-admin@vsphere.local' --url 'vra-01.company.com'
```
