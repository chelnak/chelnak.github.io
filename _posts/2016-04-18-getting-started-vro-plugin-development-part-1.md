---
title: 'Getting started with vRO plugin development - Part 1'
date: 2016-04-18T14:00:30+00:00
author: Craig
layout: post
permalink: /2016/04/getting-started-vro-plugin-development-part-1.html
categories:
  - vRealize Orchestrator
tags:
  - vExpert
  - vRO
---
vRO plugin development is something I've wanted to get in to for ages. Mainly because I wanted an excuse to do some more learning around JAVA and also because it's an area of the product that I know little about. The main issue with getting the ball rolling with this was the **serious lack of information** relating to developing plugins for vRO 6.x and from what I've noticed quite a lot has changed since version 5.5.

Over the next few posts I'm hoping to share what I've learnt so far. Hopefully it will give someone a head start. It would also be cool to hear from anyone who has done more miles with this than me.. Have I misunderstood a concept? Or missed something important out? Let me know.

* **Getting started with vRO plugin development - Part 1 - You are here!**
* [Getting started with vRO plugin development - Part 2](http://www.helloitscraig.co.uk/2016/04/getting-started-vro-plugin-development-part-2.html)

<!--more-->

## Versions

These posts have been based of the following versions:

* vRealize Orchestrator 6.0.3
* [Maven 3.0.5](https://archive.apache.org/dist/maven/maven-3/3.0.5/binaries/) (Click [here](https://maven.apache.org/guides/getting-started/windows-prerequisites.html) for windows configuration)
* [Spring Tool Suite 3.7.3](http://dist.springsource.com/release/STS/3.7.3.RELEASE/dist/e4.5/spring-tool-suite-3.7.3.RELEASE-e4.5.2-win32-x86_64.zip) (based on eclipse 4.5.2)
* Java SE development kit 8 update 65 (64bit)

## Getting started

Before you begin, test that maven is working as expected by opening up a command prompt and running:

```Bash
mvn --version
```

You should see something that looks similar to this:

![mavenok](/assets/images/mavenok.png)

So that we can keep all of our development contained, create a new directory and cd to it. In this post I'm going to be using C:\vROPluginDevelopment.

```Bash
mkdir C:\vROPluginDevelopment && cd C:\vROPluginDevelopment
```

Once you have confirmed that Maven is configured and your development directory has been created, head over to the following URL on your vRO appliance:

```Bash
https://[vro-appliance]:8281/vco/develop.jsp
```

You'll see some maven commands that have been customised with your vRO appliance fqdn. Go back to your command prompt and make sure that you are still in the correct directory and run the first command:

```Bash
mvn archetype:generate -DarchetypeCatalog=https://[vro-appliance]:8281/vco-repo/archetype-catalog.xml -DrepoUrl=https://[vro-appliance]:8281/vco-repo -Dmaven.repo.remote=https://[vro-appliance]:8281/vco-repo -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true
```

Once maven has done it's thing, you'll be prompted to choose an archetype:

![archetype](/assets/images/choose-an-archetype.png)

I'm going to be using **com.vmware.o11n:o11n-archetype-spring** which is option **5**. One thing that I've noticed after a bit of trial and error is that each archetype has it's own quirks. All of the ones that I have tried so far have needed manual changes to the master pom.xml.. as you will see in a second.

When you choose an archetype you will be prompted with a number of questions. These will help maven configure the project properly. Here is what I will be using in this example:

* **groupId:** com.company
* **artifactId:** helloworld
* **package:** com.company.helloworld
* **pluginAlias:** HelloWorld
* **pluginName:** HelloWorld
* **rootElement:** helloworld
* **vcoVersion:** 6.0.3

If you are happy with what you have entered, confirm the configuration:

![confirm](/assets/images/confirm.png)

Maven will now attempt to build the project, pulling any dependencies it needs from the repository hosted on the vRO appliance. If successful you should end up with a directory matching the name of the plugin which contains three folders and a pom.xml:

![initial-build](/assets/images/initial-build.png)

Great, so the initial project is built but before you can continue there is a small bit of work to do in the master pom.xml file.

Open it up in a decent [text editor](https://atom.io/) and search for `<properties>`. Add the following property to the list (replacing [vro-appliance] with the fqdn of your appliance):

```XML
<repoUrl>;https://[vro-appliance]:8281/vco-repo</repoUrl>
```

It should end up looking something like this:

![pom-edited](/assets/images/pom-edited.png)

Without this change, the project will not build as maven will have no idea were the repository is. I'm not sure if this is by design or a bug? My guess is bug as some of the other archetypes have similar issues.

Now everything is in place, lets run a test build to make sure everything is correct. Make sure you are in the project directory, which in this example is C:\vROPluginDevelopment\helloworld, and run the following command:

```Bash
mvn clean install -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true
```

If there were no errors, great! Maven will have compiled the project and created a vmoapp file that is ready to upload to vRO.

```Bash
C:\vROPluginDevelopment\helloworld\o11nplugin-helloworld\target\o11nplugin-helloworld-1.0.0-SNAPSHOT.vmoapp
```

In part two, I'll be showing you how to make some basic modifications to the out of the box code. Stay tuned. :-)
