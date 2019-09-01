---
title: Prettifying JSON strings with JSON.stringify()
date: 2015-12-06T11:58:06+00:00
author: Craig
layout: post
permalink: /2015/12/prettifying-json-strings-with-json-stringify.html
categories:
  - vRealize Orchestrator
tags:
  - vRO
---
Something that I'm sure you will all be aware of is that you can "pretty print" a JavaScript object with JSON.stringify.

So for example, **System.log(object)** will log a flat JSON string to the console by default.

<img class="alignnone wp-image-503 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/11/standard.png" alt="stringify" width="487" height="89" />

The other week, one of guys that I'm working with on my current engagement pointed me towards the **space** parameter of JSON.stringify().

Here is the syntax from <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">MDN</a>:

<img class="alignnone wp-image-502 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/11/stringifysyntax.png" alt="stringify" width="702" height="105" />

<!--more-->

Making use of this parameter will allow you to <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">insert white space into the output JSON string for readability purposes</a>.. which is a massive help when it comes to debugging a large object or saving it to a file as a string.

The screenshot below uses the following line of code:

<code>System.log(JSON.stringify(object, null, 2);</code>

I'm passing **<em>null</em> **in place of the replacer parameter because I'm not going to be using it.

<img class="alignnone wp-image-504 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2015/11/stringifyparam.png" alt="stringify" width="471" height="136" />

I'm still not sure why I hadn't looked for this functionality in JavaScript as I've always use the indent parameter of <a href="https://docs.python.org/2/library/json.html">JSON.dumps</a> when doing similar stuff in Python. At least I know now though ;-)

&nbsp;