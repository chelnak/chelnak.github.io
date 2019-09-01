---
title: '[%Encoded Absolute URL%] link to form not opening inbrowser #Infopath #SharePoint'
date: 2011-06-15T14:48:00+00:00
author: Craig
layout: post
permalink: /2011/06/encoded-absolute-url-link-to-form-not.html
categories:
  - SharePoint
---
Had a pretty successful meeting today with our Web Dev guy today and managed to finalize our first InfoPath form and Workflow!

We have our InfoPath forms browser enabled & we are using the ```[%Current Item:Encoded Absolute URL%]``` lookup as a hyperlink in the email sent by the workflow. When the user clicked the link to the form via their email (which linked directly to the XML document) it would open up in InfoPath filler.. this is not what we wanted...

<!--more-->

It turns out (and is quite logical when considered) that you need to construct the URL around the [%Current Item:Encoded Absolute URL%] lookup.

If you open a form and take a look at the URL in the browser it looks something like this:

```
http://[webapp]/[Site]/_Layouts/FormServer.aspx?XmlLocation=/[Site]/[Forms %Library]/[Form].xml&[SomeSettings]&DefaultItemOpen=1
```

What we needed to do is replace the text after "XmlLocation=" with our lookup value```[%Current Item:Encoded Absolute URL%].```

It is important to append a source perameter to the end of the URL. This will tell the browser where to go once you have submitted the form. This can be a link back to your home page or a custom HTML file stored in the Site Pages library.

Resulting in the URL looking like this:

```
http://[webapp]/[hr]/_layouts/FormServer.aspx?XmlLocation=[%Current Item:Encoded Absolute URL%]&ClientInstalled=true&Source=[PageReturURL]%3FInitialTabId%3DRibbon%252EDocument%26VisibilityContext%3DWSSTabPersistence&DefaultItemOpen=1
```

When testing the user was able to open the form in the browser.