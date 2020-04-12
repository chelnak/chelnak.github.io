---
title: How to use vCACCAFERestClient in the vRealize Orchestrator plug-in for vRealize Automation
date: 2015-10-02T08:59:47+00:00
author: Craig
layout: post
permalink: /2015/10/how-to-use-vcaccaferestclient-in-the-vrealize-orchestrator-plug-in-for-vrealize-automation.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vCAC
  - vRA
  - vRO
---
## Background

Previously when I've needed to do things that the vRA vRO plug-in doesn't provide natively i've always turned to the API. And as many of you know, when it comes to mixing OOTB functionality with custom rest hosts and operations coupled with a separate authentication process things can get a bit complex.

Last night, I finally cracked how to use the built-in reset client. This was a game changer for me because it meant no more messing with bearer tokens or worrying about keeping credentials up to date in vRO.

In addition to the above, it also means that I can now reduce the complexity of my reservation creation workflows!

Exciting times :-)

<!--more-->

## Using vCACCAFERestClient

Before we begin to use the rest client, we need to create a new instance of vCACCAFERestClient.

```
var resetClient = vCACCAFEHost.createRestClient(endpoint)
```

vCACCAFEHost.createRestClient takes one string input. This is the endpoint of the API you will be communicating with.

![createRestClient](/assets/images/createRestClient.png)

You can get a list of available endpoints by executing the following REST request:

`https://vra-appliance.local/component-registry/endpoints?limit=999999&orderby="url"`

The response body should contain about 136 elements. Each one formatted like this:

```
{
"@type": "EndPoint",
"id": "bdcdc296-86ab-44b6-adf4-a87d34be0734",
"createdDate": null,
"lastUpdated": null,
"url": "https://vra-appliance.local/reservation-service/api",
"endPointType": {
"typeId": "com.vmware.vcac.core.cafe.reservation.api",
"protocol": "REST"
},
"serviceInfoId": "61417527-965d-46f8-8520-2377ca0c2526",
"endPointAttributes": null,
"sslTrusts": null
}
```

You will need to use the typeId as the parameter for createRestClient. In this example I am going to be using the reservation-service api.

```
var endpoint = "com.vmware.vcac.core.cafe.reservation.api";
var resetClient = vCACCAFEHost.createRestClient(endpoint);
```

You can use vCACCAFERestClient.getUrl() to view the base url of the API you are going to be working with.  Adding this line will log it to the console:

```
System.log(restClient.getUrl());
```

So now we can start to perform basic operations against the reservation-service API. Let's try to GET all reservations..

![vCACCAFERestClient](/assets/images/vCACCAFERestClient.png)

The vCACCAFERestClient.get() method has one input: **resourceUrl**. We are working with the reservations API so we know this is going to be **reservations**.

```
var resourceUrl = "reservations";
```

And now execute a GET request:

```
var response = restClient.get(resourceUrl);
```

The return type of the request is vCACCAFEServiceResponse. This gives us a number of ways to handle the response. I've chosen getBodyAsJson().

```
var body = response.getBodyAsJson();
```

The reservations we want to access are in an array called content. You can iterate through these with a simple for loop and pull out any property you want. For example, you could print out the name of each reservation like this:

```
var reservations = body['content'];

for (var i = 0; i < reservations.length; i++) {

System.log(reservations[i].name);

}
```

Here is the full scriptable task:

<script src="https://gist.github.com/chelnak/ca99bb0ef18b33d1afd1.js"></script>

My guess that a few more posts will come of the back of this, so watch this space!
