---
title: Migrating vRealize Automation Machine Prefixes with CloudClient
date: 2015-08-03T20:02:00+00:00
author: Craig
layout: post
permalink: /2015/08/migrating-vrealize-automation-machine.html
blogger_blog:
  - www.helloitscraig.co.uk
blogger_author:
  - Craig Gumbley
blogger_permalink:
  - /2015/07/migrating-vrealize-automation-machine.html
blogger_internal:
  - /feeds/7037410020009765476/posts/default/6380623692128809563
categories:
  - vRealize Automation
tags:
  - CloudClient
  - vCAC
  - vRA
---
I needed to migrate quite a few vRealize Automation machine prefixes over to a new instance of vRealize Automation and found myself wondering if I could automate it. I was quite surprised to find that you can't do this with the public API at the moment, so decided to give cloudclient a try.

It turns out that you can export a list of machine prefixes to a file, formatted in either JSON or CSV. However, importing still looks like a manual job.

Here is a quick(ha) post outlining how semi automated the process with Python and PowerShell examples.
<!--more-->
<h3>Getting started</h3>
In this post I will refer to **vRA-A** as the instance to migrate from and **vRA-B** as the new instance.
Start by creating a new directory called **vRAExports** and grabbing a copy of the script in <a style="font-weight: bold;" href="https://gist.github.com/chelnak/fe26487661b91a8b8c30">this gist</a>.

Save it as **createCloudClientScript.py**
<h3>Configuring cloudclient</h3>
Before firing up cloudclient, you will need to make sure you have your autologinfile configured and pointing to **vRA-A**, which is where our machine prefixes are currently located.

To create an autologinfle run the following:
```./cloudclient login autologinfile```
You should now have file called CloudClient.properties in the root of your cloudclient directory.

Edit the following variables:

* vra_server
* vra_tenant
* vra_username
* vra_password
* vra_iaas_server
* vra_iaas_username
* vra_iaas_password

Save and close the file.

If you get stuck. Check of the <a href="https://developercenter.vmware.com/tool/cloudclient/3.2.0">cloudclient documentation</a> for more detailed steps.
<h3>Get a list of machine prefixes</h3>
Now that cloudclient is configured for autologins we need to export a list of machine prefixes from **vRA-A**.

To do this, run the following:
```./cloudclient vra machineprefix list --export **/YOUR_PATH_HERE/vRAExports/**vra-machineprefixes.json --format "JSON"```
If successful, the output of the script should be similar to this:
```Output written to: /YOUR_PATH_HERE/vRAExports/vra-machineprefixes.json```
Take a look inside the json file.  You should see your machine prefixes listed in json format:

<img class="alignleft wp-image-30 size-full" src="http://helloitscraig.co.uk/wp-content/uploads/2015/08/cloudclient2.png" alt="cloudclient2" width="803" height="102" />

We are interested in the values of Prefix, NextNumber and NumberOfDigits.
<h3>Getting the data</h3>
The **createCloudClientScript.py **script loops through each block in **Items, **grabs the values of the three fields and writes out a cloudclient command for each machine prefix to a file.

Here is the full script
<script src="https://gist.github.com/chelnak/fe26487661b91a8b8c30.js"></script>Before it can be executed we need to edit the following variables: **cloudClientPath:** Full path to cloudclient **prefixJSONFile:** Path to your prefix json file **prefixScriptFile:** Path to the resulting script file Save the file and run the following to generate the cloudclient script:

```python createCloudClientScript.py```

You should now have a file called **machineprefix-cloudclient-commands.sh** in the same directory. 

<h3>Creating the new prefixes</h3>

Before you go ahead and run **machineprefix-cloudclient-commands.sh**, open CloudClient.properties and update the variables we populated earlier with the correct information for **vRA-B**. At this point, I like to double check that I am pointed at the right vRA instance. This can be done by listing the current machine prefixes:

```./cloudclient.sh vra machineprefix list```

If this is a fresh install, the response should be empty. To create the new machine prefixes in **vRA-B** make sure you are in the script directory (**vRAExports**) then run the following:

```sh machineprefix-cloudclient-commands.sh```

After a few seconds, the script will complete and you will be able to list the newly created machine prefixes with:

```./cloudclient.sh vra machineprefix list```

&nbsp;

<h3>Can I do this with PowerShell too?</h3>

Sure. Take a look at the PowerShell version of **createCloudClientScript**:<script src="https://gist.github.com/chelnak/f6ebaaec479b68c5f7b8.js"></script>

Generate your json file by following the same steps above, however this time you will be using the .bat launcher for cloudclient.
Once you have your file in place, edit the variables at the top of the script and run! Simple. The script will go and create a file called **machineprefix-cloudclient-commands.ps1**, which you can run to create your new machine prefixes.