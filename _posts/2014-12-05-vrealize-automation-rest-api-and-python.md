---
title: vRealize Automation REST API and Python
date: 2014-12-05T11:11:00+00:00
author: Craig
layout: post
permalink: /2014/12/vrealize-automation-rest-api-and-python.html
categories:
  - vRealize Automation
tags:
  - vCAC
  - vRA
---

Over the last year I've been doing **a lot** of work with vRealize Automation and vCenter Orchestrator.

One thing I have been putting off is learning how to use the vRA REST API.. Why would you really need to when vCO provides you with the necessary interfaces? But with the release of vRA 6.1 came the new REST API, so I decided it was probably time I had a look.

For me, the easiest way to learn your way round an API is to try and solve a problem with it. I used a situation that I came across in a meeting recently as a theoretical problem:

A customer wants to use vRA to manage their resources but wants the provisioning of a resource to fit in with their current processes. They need to be able to trigger a deployment from an external source then run some scripts on the Virtual Machine once it has provisioned.

The steps needed to be as follows:

* Deploy a Virtual Machine from a blueprint.
* Monitor the status of the request through the deployment.
* Finally, return networking information about the provisioned Virtual Machine at the end of the process so that IP address can be passed on to another script for other fun automation things.

<!--more-->

My language of choice is currently Python so I decided I would create a simple wrapper module for the API.

You can download the project from my [github](https://github.com/chelnak/vRAAPIClient).

Here is an example of how you can use the module.

* Before you start you'll need to create a file called request.json that contains the POST data for the request. I followed [this](http://grantorchard.com/vcac/concepts/exploring-vcac-api-part-1/) post from Grant Orchard's blog. If you stop by there make sure you take the time to read some of his posts. I've learnt a lot from them over the last year!
* Next, grab a copy of [requests](http://docs.python-requests.org/en/latest/user/install/#install). I will write a setup.py script at somepoint for this.

<script src="https://gist.github.com/chelnak/595498e178ab804e274c.js"></script>

My plan is to slowly build up the module over time, adding more features as I start to use different parts of the API.

Also feel free to fork my repo if you want to add or change something!
