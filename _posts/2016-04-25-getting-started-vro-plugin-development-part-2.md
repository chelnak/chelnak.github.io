---
title: 'Getting started with vRO plugin development - Part 2'
date: 2016-04-25T14:00:23+00:00
author: Craig
layout: post
permalink: /2016/04/getting-started-vro-plugin-development-part-2.html
categories:
  - vRealize Orchestrator
tags:
  - vExpert
  - vRO
---
In part one we successfully built a vRO plugin from the **com.vmware.o11n:o11n-archetype-spring **archetype. In part two we are going to make some basic changes to the out of the box class and add our own method for consumption in vRO.

Before you go any further though, i'd highly recommend reading the [vRO 6 Developers Guide](http://pubs.vmware.com/vsphere-60/topic/com.vmware.ICbase/PDF/vrealize-orchestrator-60-developers-guide.pdf) document. It contains more information on some of the topics I am going to touch on in this post.

* [Getting started with vRO plugin development - Part 1](http://www.helloitscraig.co.uk/2016/04/getting-started-vro-plugin-development-part-1.html)
* **Getting started with vRO plugin development - Part 2 <- You are here!**

<!--more-->

## Importing the project in to STS

Open STS and select File then Import. When the Import dialog appears type **maven** in to the filter field and choose **Existing Maven Projects** from the list.

![import](/assets/images/import-project.png)

Click Next then browse to the project directory (C:\vROPluginDevelopment\helloworld). Make sure that everything in the list is selected and click Finish.

![import](/assets/images/import-project2.png)

You should now see the following structure in the package explorer:

![package-explorer](/assets/images/package-explorer.png)

Take five minutes to explore and try to get familiar with the different parts of the package. It will help a lot if you need to troubleshoot later on (trust me).

## HelloWorld

Select **o11nplugin-helloworld-core** then drill down until you reach **com.company.helloworld.model** and open **HelloWorldGreetingService.java**.

![model](/assets/images/model.png)

Add the following underneath the existing greet method:

```Java
public String helloWorld() {

    return "Hello World!";

}
```

You should end up with something that looks like this:

![greetingservice](/assets/images/greetingservice.png)

If everything looks OK, save your changes and open **HelloWorldGreeter.java**. You need to add a few lines of code to this file to make sure that vso.xml gets updated with the method that you have just added to HelloWorldGreetingService.java.

Once again, add the following right underneath the existing greet method:

```Java
@VsoMethod
public String helloWorld(){

    return service.helloWorld();

}
```

This time, you will notice we are using an annotation. @VsoMethod ensures that vso.xml gets updated with the new method.

Your HelloWorldGreeter.java should now look like this:

![greeter](/assets/images/greeter.png)

If everything looks good save the file. It's time to build the plugin!

## Building and testing the plugin

Before we build the plugin we need to increment the version number. Make sure you are in the project directory (C:\vROPluginDevelopment\helloworld) and run the following command:

```Java
mvn versions:set -DnewVersion=1.0.1-SNAPSHOT -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true
```

In the command above we are bumping the version to 1.0.1-SNAPSHOT. When you use the snapshot qualifier, Maven will consider the build as "unreleased". It also plays a role in how some CI systems handle the build process. You can find out more [here](https://docs.oracle.com/middleware/1212/core/MAVEN/maven_version.htm#MAVEN401).

Now run the following command to build the plugin:

```Java
mvn clean install -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true
```

If there were no errors in the build process you should now have an updated vmoapp file that contains the new method. The file can be found in C:\vROPluginDevelopment\helloworld\o11nplugin-helloworld\target.

![built](/assets/images/built.png)

Now upload the plugin to vRO and restart the service. When it comes back up log in via the client and create a new workflow and add a scriptable task. The new plugin, along with the HelloWorldGreeter class and two methods should be visible in the api explorer.

To test the method that you created just add the following line to the scriptable task:

```Java
System.log(HelloWorldGreeter.helloWorld());
```

![vro1]/assets/images4/vro1.png)

Close the scriptable task and execute the workflow. You should see the following message appear in the log:

![log](/assets/images/log.png)

Job done. You have just built a vRO plugin. My plan is to add more posts to this series as my learning continues, so watch this space.
