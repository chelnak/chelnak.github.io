---
title: Change a fields value to lowercase in InfoPath 2010
date: 2011-06-14T12:26:00+00:00
author: Craig
layout: post
permalink: /2011/06/infopath-2010-change-fields-value-to.html
categories:
  - SharePoint
---

Ahhh! My first form is almost finished... Just thought i'd blog this function (even though it's probably hanging arround a million other places on the net).

I needed to ensure a few fields were always lowercase so I applied the translate function as a rule to the required fields:

```
translate(.,"ABCDEFGHIJKLMNOPQRSTUVWYXZ", "abcdefghijklmnopqrstuvwyxz")
```

"." (above) referes to the current field.

The rule it self looks like this:

![](/assets/images/Rule-300x184.png)