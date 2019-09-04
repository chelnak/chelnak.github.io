---
title: OneTimeSecret REST API vRO Package
date: 2015-09-16T09:05:30+00:00
author: Craig
layout: post
permalink: /2015/09/onetimesecret-rest-api-vro-package.html
categories:
  - vRealize Orchestrator
tags:
  - vRO
---
I sometimes use [OneTimeSecret.com](https://onetimesecret.com/) to send passwords or secrets around. It feels like a nice way to get the job done.

It turns out that their [API](https://onetimesecret.com/docs/api) is pretty simple too. So I decided it would be fun to create a package to demonstrate how easy it is to extend vRealize Orchestrator with third party RESTful services.

![ots](/assets/images/ots.png)

In this post I'm going to go through setting up a new connection to the OTS API and each operation that the package provides.

The package can be downloaded from [FlowGrab.com](https://flowgrab.com/project/view.xhtml?id=c42f4f54-504d-4fae-b0c9-6ab03acddd02).

**There is an obvious disclaimer that goes with this post. It's intended as a proof of concept so don't use it to send company details, unless your security policy allows it.**

<!--more-->

## Get a OneTimeSecret account

Before you begin using the OneTimeSecret package you will need to create an account at [onetimesecret.com](https://onetimesecret.com) and generate an API key.

To get your API key:

* Sign up for a free account
* Login and select the Account link
* Click the API Key tab & generate a new key

Now that you have your API key, import the package accepting all messages.

## Setting up a new OneTimeSecret host in vRO

From the **OneTimeSecret/Configuration** folder, run the **Add OneTimeSecret API Host** workflow. This will configure a new REST host, using the builtin REST plugin and also create all of the necessary REST operations for OneTimeSecret.

Enter the email address used to sign up to OneTimeSecret and the API key generated in the steps above.

The proxy & certificate settings can be left as default, unless you have a requirement to change them.

![addhost](/assets/images/addhost.png)

Once the workflow has completed, verify that the REST host along with it's operations exist in the inventory tab.

![verify](/assets/images/verify.png)

## Workflow Operations

For a full description of the query parameters & attributes provided for each method please see the API docs for secrets [here](https://onetimesecret.com/docs/api/secrets).

### Share a Secret

Use this workflow to store a secret value and share it with a recepiant

![share](/assets/images/share.png)

### Generate a Secret

Generate a short, unique secret. Useful for temporary passwords, one-time pads, salts etc.

![generate](/assets/images/generate.png)

### Retrieve a Secret

Use this to retrieve a stored secret. You need the secret ID for this. You'll find it in the response body of Generate and Share a secret.

![retrieve](/assets/images/retrieve.png)

### Retrieve Metadata

Used to retrieve basic information about a secret and is usually kept private. You need the metadata key for this, which can be found in the response body.

![retrieve-metadata](/assets/images/retrieve-metadata.png)

### Retrieve Recent Metadata

This appears to be broken in the API currently, but would normally be used by executing the workflow. No inputs are required.

## Cool code

### Parsing responses

Most of the above methods will return a response as a JSON string. However, strings can be hard to work with, this is why I like to parse them to an object. You can then easily access the attributes and use them in other parts of your workflows.

I use this action to parse the response with json.parse() then loop through each attribute.

<script src="https://gist.github.com/chelnak/458f8816cf7092cf9a6e.js"></script>

You can see that the for loop accesses each attribute and logs it to the console using jsonResponse[i] (where i is equal to the attribute name e.g. jsonResponse['value']).

### Getting REST hosts and operations by name

The following two pieces of code were taken from the [Big Data Extensions plugin](https://solutionexchange.vmware.com/store/products/hadoop-as-a-service-vmware-vcloud-automation-center-and-big-data-extension#.VfhCRvlVhBc). They remove the need to update each workflow with the host and operation object after configuration.

<script src="https://gist.github.com/chelnak/b2d11c07f6daccd139ac.js"></script>

<script src="https://gist.github.com/chelnak/b66fbcb13be45e97f204.js"></script>

Each workflow has a string attribute for restHostName and operationName. These names are predefined by the **Add OneTimeSecret API Host** workflow.

![namexam](/assets/images/namexam.png)

Using the **Generate a Secre**t workflow as an example:

* restHostName is passed to the **Get REST Host By Name** workflow
* This returns the OneTimeSecret API RESTHost object
* The restHost, along with the operationName are then passed to the **Get REST Operation By Name** workflow
* This returns the RESTOperation object
* With this, we can then execute our operation in the rest call

It may seem long winded, but it removes the need to manually configure each workflow after running the **Add OneTimeSecret API Host** workflow. Thus creating a portable workflow with one click configuration.
