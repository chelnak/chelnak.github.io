---
title: Storing JSON files as vRealize Orchestrator Resource Elements
date: 2015-08-11T10:05:00+00:00
author: Craig
layout: post
permalink: /2015/08/storing-json-files-as-vrealize.html
categories:
  - vRealize Orchestrator
tags:
  - vRO
---
Let's say that you have a reasonably large JSON template that you need to POST to a REST API via the HTTP-REST plugin. How do you go about storing it for use in your vRealize Orchestrator workflow without having to escape line breaks, worry about formatting and most importantly update values so each POST is unique?

I recently had a requirement to do this and found that storing the JSON template as a Resource Element made the process 100 times easier.

Here are a few steps that outline what I did...

<!--more-->

## Importing Resource Elements

Before you do anything with your JSON file, I would always recommend validating it with a tool like [this](http://json.parser.online.fr/). If you start with valid content then it will make debugging so much easier later on!

Once you are sure that your file is valid, you'll need to import it. Click on the resources tab (which is only valid if you are in design view), create a new folder and import your JSON file by right clicking on the new folder and selecting `Import Resource`.

You should now have something similar to this:

![reslist](/assets/images/reslist.png)

## Using the Resource Element as a dynamic template

Now that the JSON template is saved as a resource element, there is a good chance that you will need to change certain values to make each POST unique. Especially if your POST request is creating a new resource (like a vRA Reservation).

This can be easily done by parsing the file with JSON.parse. JSON.parse will take a JSON string and parse it in to an object. Once parsed, you can access individual fields and update them using the following synatax:

```
jsonObject['name'] = "A new name!"
```

Here is an example of a scriptable task that I use to take a JSON template stored as a Resource Element and change two values:

<script src="https://gist.github.com/chelnak/813167f381ab99acc1e6.js"></script>

You can see that the final step uses JSON.stringify. This does exactly what it says. It will take our object, with updated values, and convert it back to a JSON string which we store in the variable payload.

The payload variable can then be passed on to your REST operation workflow.
