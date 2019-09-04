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

![standard](/assets/images/standard.png)

The other week, one of guys that I'm working with on my current engagement pointed me towards the **space** parameter of JSON.stringify().

Here is the syntax from [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify):

![stringifysyntax](/assets/images/stringifysyntax.png)

<!--more-->

Making use of this parameter will allow you to [insert white space into the output JSON string for readability purposes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).. which is a massive help when it comes to debugging a large object or saving it to a file as a string.

The screenshot below uses the following line of code:

```Javascript
System.log(JSON.stringify(object, null, 2);
```

I'm passing `null` in place of the replacer parameter because I'm not going to be using it.

![stringifyparam](/assets/images/stringifyparam.png)

I'm still not sure why I hadn't looked for this functionality in JavaScript as I've always use the indent parameter of [JSON.dumps](https://docs.python.org/2/library/json.html) when doing similar stuff in Python. At least I know now though ;-)
