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
I sometimes use <a href="https://onetimesecret.com/">OneTimeSecret.com</a> to send passwords or secrets around. It feels like a nice way to get the job done.

It turns out that their <a href="https://onetimesecret.com/docs/api" target="_blank">API</a> is pretty simple too. So I decided it would be fun to create a package to demonstrate how easy it is to extend vRealize Orchestrator with third party RESTful services.

<img class="alignnone wp-image-241 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/09/ots.png" alt="ots" width="243" height="218" />

In this post I'm going to go through setting up a new connection to the OTS API and each operation that the package provides.

The package can be downloaded from <a href="https://flowgrab.com/project/view.xhtml?id=c42f4f54-504d-4fae-b0c9-6ab03acddd02" target="_blank">FlowGrab.com</a>.

**There is an obvious disclaimer that goes with this post. It's intended as a proof of concept so don't use it to send company details, unless your security policy allows it.**

<!--more-->
<h2>Get a OneTimeSecret account</h2>
Before you begin using the OneTimeSecret package you will need to create an account at <a href="https://onetimesecret.com" target="_blank">onetimesecret.com</a> and generate an API key.

To get your API key:
<ol>
* Sign up for a free account
* Login and select the Account link
* Click the API Key tab & generate a new key
</ol>
Now that you have your API key, import the package accepting all messages.
<h2>Setting up a new OneTimeSecret host in vRO</h2>
From the **OneTimeSecret/Configuration** folder, run the **Add OneTimeSecret API Host** workflow. This will configure a new REST host, using the builtin REST plugin and also create all of the necessary REST operations for OneTimeSecret.

Enter the email address used to sign up to OneTimeSecret and the API key generated in the steps above.

The proxy & certificate settings can be left as default, unless you have a requirement to change them.

&nbsp;

<img class="alignnone size-full wp-image-38" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/07/addhost.png" alt="addhost" width="517" height="280" />

&nbsp;

Once the workflow has completed, verify that the REST host along with it's operations exist in the inventory tab.

&nbsp;

<img class="alignnone size-full wp-image-39" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/07/verify.png" alt="verify" width="330" height="123" />

&nbsp;
<h2>Workflow Operations</h2>
For a full description of the query parameters & attributes provided for each method please see the API docs for secrets <a href="https://onetimesecret.com/docs/api/secrets">here</a>.
<h3>Share a Secret</h3>
Use this workflow to store a secret value and share it with a recepiant

<img class="alignnone size-full wp-image-41" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/07/share.png" alt="share" width="559" height="325" />
<h3>Generate a Secret</h3>
Generate a short, unique secret. Useful for temporary passwords, one-time pads, salts etc.

<img class="alignnone size-full wp-image-40" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/07/generate.png" alt="generate" width="532" height="340" />
<h3>Retrieve a Secret</h3>
Use this to retrieve a stored secret. You need the secret ID for this. You'll find it in the response body of Generate and Share a secret.

<a href="http://www.helloitscraig.co.uk/wp-content/uploads/2015/09/retrieve.png"><img class="alignnone size-full wp-image-247" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/09/retrieve.png" alt="retrieve" width="540" height="132" /></a>
<h3>Retrieve Metadata</h3>
Used to retrieve basic information about a secret and is usually kept private. You need the metadata key for this, which can be found in the response body.

<a href="http://www.helloitscraig.co.uk/wp-content/uploads/2015/09/retrieve-metadata.png"><img class="alignnone size-full wp-image-246" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/09/retrieve-metadata.png" alt="retrieve-metadata" width="533" height="58" /></a>
<h3>Retrieve Recent Metadata</h3>
This appears to be broken in the API currently, but would normally be used by executing the workflow. No inputs are required.
<h2>Cool code</h2>
<h3>Parsing responses</h3>
Most of the above methods will return a response as a JSON string. However, strings can be hard to work with, this is why I like to parse them to an object. You can then easily access the attributes and use them in other parts of your workflows.

I use this action to parse the response with json.parse() then loop through each attribute.

<script src="https://gist.github.com/chelnak/458f8816cf7092cf9a6e.js"></script>You can see that the for loop accesses each attribute and logs it to the console using jsonResponse[i] (where i is equal to the attribute name e.g. jsonResponse['value']). 

<h3>Getting REST hosts and operations by name</h3>

The following two pieces of code were taken from the <a href="https://solutionexchange.vmware.com/store/products/hadoop-as-a-service-vmware-vcloud-automation-center-and-big-data-extension#.VfhCRvlVhBc" target="_blank">Big Data Extensions plugin</a>. They remove the need to update each workflow with the host and operation object after configuration.<script src="https://gist.github.com/chelnak/b2d11c07f6daccd139ac.js"></script>

<script src="https://gist.github.com/chelnak/b66fbcb13be45e97f204.js"></script>

Each workflow has a string attribute for restHostName and operationName. These names are predefined by the **Add OneTimeSecret API Host** workflow.

<img class="alignnone size-full wp-image-259" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/09/namexam.png" alt="namexam" width="760" height="62" />

Using the **Generate a Secre**t workflow as an example:
<ol>
* restHostName is passed to the **Get REST Host By Name** workflow
* This returns the OneTimeSecret API RESTHost object
* The restHost, along with the operationName are then passed to the **Get REST Operation By Name** workflow
* This returns the RESTOperation object
* With this, we can then execute our operation in the rest call
</ol>
It may seem long winded, but it removes the need to manually configure each workflow after running the **Add OneTimeSecret API Host** workflow. Thus creating a portable workflow with one click configuration.