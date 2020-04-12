---
title: Executing workflows and actions with the o11n-gateway-service API
date: 2017-05-04T12:48:00+00:00
author: Craig
layout: post
permalink: /2017/05/o11n-gateway-service-executing-workflows-actions.html
categories:
  - vRealize Automation
  - vRealize Orchestrator
tags:
  - vExpert
  - vRA7
  - vRO
---

The Orchestration Gateway Service API (or o11n-gateway-service) was introduced in vRA 7.1 and provides a gateway to the vRO instance that is registered with vRA. It enables us to interact with vRO elements such as workflows and actions without the need to make external authenticated API requests.

The [documentation]("http://pubs.vmware.com/vrealize-automation-72/topic/com.vmware.vra.restapi.doc/docs/o11n-gateway-service.html") that exists for this API is fairly comprehensive, however it's not very forthcoming with some of the smaller details you need to get going. It took a fair bit of effort to work out the correct payload format for the requests so I thought it would be a good idea to share what I found.

<!--more-->

## Workflows

Here is an example body for a workflow that has one input parameter called name. Input parameters are specified in the **requestData** property as a **literalMap**. A literalMap is an array of key value pairs where **key** is the name of the parameter and **value** describes what is expected. For example; the **type** (e.g. string) and **value** (e.g. Test) required by the input parameter.

```javascript
{
    "requestHeader":  null,
    "requestData": {
        "entries":  [
        {
            "key":  "name",
            "value": {
                "type":  "string",
                "value":  "Test"
            }
        }
        ]
    },
    "correlation":  null,
    "requestedBy":  "cgumbley@vsphere.local",
    "description":  null,
    "callbackServiceId":  null
}
```

### Example

In the following example we execute the **Force data collection** library workflow:

<script src="https://gist.github.com/chelnak/dd60d927343065fbd2dc46040d53bd65.js"></script>

**Tip**: I found that you don't need to pass complex types for inventory objects. You can see in the example above that I am just passing the id of the registered vCACHost.

## Retrieving information about an execution

The documentation states that a successful request will return the "run request id". This id can be used to request information about the execution of a workflow. It can be retrieved by examining the **location** property in the response headers. For example:

```powershell
$Response.Headers.Location
https://vra.corp.local/o11n-gateway-service/api/tenants/Tenant01/workflows/9ef7fdb1-2385-4fe5-adc7-5527ca124da7/bf6cdf7e-b1ba-42fb-99a2-6d4c31d56c27
```

We are interested in the id at the end of the url (bf6cdf7e-b1ba-42fb-99a2-6d4c31d56c27).

In the example below, the request id is used to request some basic information about the execution:

![WorkflowInfo](/assets/images/workflowInfo.png)

In addition to the example above, the following requests could be made:

* /o11n-gateway-service/api/tenants/Tenant01/requests/bf6cdf7e-b1ba-42fb-99a2-6d4c31d56c27/**cancel**
* /o11n-gateway-service/api/tenants/Tenant01/requests/bf6cdf7e-b1ba-42fb-99a2-6d4c31d56c27/**logs**
* /o11n-gateway-service/api/tenants/Tenant01/requests/bf6cdf7e-b1ba-42fb-99a2-6d4c31d56c27/**result**

## Actions

Executing an actions isn't as complicated as workflows. We only need to specify a literalMap as the body. Once again, **key** is the name of the input parameter and **value** describes what is expected. So in this example we have a parameter called example which is expecting a string.

```javascript
{
    "entries":  [
        {
            "key":  "example",
            "value": {
                "type":  "string",
                "value":  "example"
            }
        }
    ]
}
```

In the following example we are executing a custom action called **testAction** which is in the **test** module:

<script src="https://gist.github.com/chelnak/6d99d1a37dd44262925cae9152a77e85.js"></script>

**Note:** I found that it's a little harder to see what is going on behind the scenes with actions. However, tailing **scripting.log **should provide all of the necessary information needed to determine whether the execution was successful or not.
