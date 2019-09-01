---
title: 'vRA 7.0.1: vco service - Exeception during remote status retrieval for url'
date: 2016-07-14T14:43:48+00:00
author: Craig
layout: post
permalink: /2016/07/vra-exeception-remote-status-retrieval.html
categories:
  - vRealize Automation
tags:
  - vRA7
---
While working in a vRA 7.0.1 environment recently I came across an interesting issue where some core services were not behaving the way they should. The **vco** service seemed to be unregistered and **shell-ui-app** along with **advanced-designer-service** were showing as UNAVAILABLE.

<img class="alignnone wp-image-776 size-medium" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/07/Service-List-194x300.png" alt="vRA" width="194" height="300" />

<!--more-->

Taking a closer look at the vco service revealed the following error:
```Exeception during remote status retrieval for url: https://vra.company.local:8281/vco/api/status. Error Message I/O error on GET request for "https://vra.company.local:8281 [vra.company.com/127.0.0.1] failed: Connection refused: nested exception is org.apache.http.conn.HttpHostConnectException: Connect to vra.company.local:8281 [vra.company.com/127.0.0.1] failed: Connection refused.
```
The first thing that caught my eye was that requests were being made on port 8281. This shouldn't be the case as the embedded vRO instance is exposed on port 443. A quick curl to the endpoint url confirmed that this was the case.
```curl https://vra.company.local:8281/vco/api/status &lt;- Did not work

curl https://vra.company.local:443/vco/api/status &lt;- Worked as expected
```
After a bit of google-fu I came across a <a href="https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2112679" target="_blank">KB2112679</a> which suggests using **vcac-vami vco-service-reconfigure** to resolve issues with embedded vRO connectivity issues.

Running the command and waiting for a few minutes seemed to re-register the service. However the shell-ui-app and advanced-designer-service were still UNAVAILABLE.

<img class="alignnone wp-image-780 size-full" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/07/vcoservice1.png" alt="vRA" width="1070" height="247" />

Giving the appliance a reboot seemed to allow the services to start in order and satisfy any dependencies that they had on the vco service. After a few minutes all services were showing as REGISTERED.

<img class="alignnone wp-image-778 size-medium" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/07/all-registered-196x300.png" alt="vRA" width="196" height="300" />

Happy days :-)

<em>UPDATE:</em> It also looks like <a href="http://www.xtravirt.com">Xtravirt </a>colleague <a href="https://twitter.com/GiulianoBerteo">Giuliano Bertello</a> had some success with **vcac-vami**. You can find his article <a href="http://blog.bertello.org/2015/06/07/unable-to-configure-vco-plug-ins-as-endpoint/">here</a>.

More information on troubleshooting vRA services with PowervRA can be found in this article: <a href="https://www.helloitscraig.co.uk/2016/03/introducing-powervra.html">https://www.helloitscraig.co.uk/2016/03/introducing-powervra.html</a>