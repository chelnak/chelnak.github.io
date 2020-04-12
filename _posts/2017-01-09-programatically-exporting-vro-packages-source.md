---
title: Programatically exporting vRO packages to source
date: 2017-01-09T13:00:03+00:00
author: Craig
layout: post
permalink: /2017/01/programatically-exporting-vro-packages-source.html
categories:
  - vRealize Orchestrator
tags:
  - vExpert
  - vRO
---
I've been meaning to get this post done for ages but kept forgetting. Ten points to [Tim Hynes](https://twitter.com/railroadmanuk) for reminding me get on with it.

So at the moment the vRO REST API doesn't support exporting packages to a folder. However there are a few ways to programatically achieve this. One way is to use maven and the [maven-o11n-package-plugin](https://github.com/chelnak/maven-o11n-package-plugin-help) and the second, which is the one i'll be covering in this post, is to use vco-cli.

According to the inbuilt help, vco-cli is a

>Command line tool,that provides basic vCO package import and export operations. As source or target it can have either .package file, or directory.</

More information about the functionality provided by the tool can be found in [this exported help document](https://gist.github.com/chelnak/5f5806b3f61608a1d5e8c0242b82d709).

<!--more-->

In the following example, I'm using vRealize Orchestrator 7.0.1 (embedded in the vRA appliance) and Java 1.8.0_111.

## Getting Started

Create a new directory. This will be the home to the exported package and a few other tools that you are going to need.

```powershell
mkdir TestPackageRepository
cd TestPackageRepository
```

Now download the vco-cli jar file from the appliance and save it in the new directory.

```
https://vra-appliance.corp.local/vco-repo/com/vmware/o11n/tool/vco-cli-java/7.0.1/vco-cli-java-7.0.1.jar
```

The next step is to create a keystore and key pair. This will be used to sign your package when it is being built or imported from the command line.

```
keytool -genkey -keyalg RSA -alias _DunesRSA_Alias_ -keystore example.vmokeystore -storepass password123 -validity 3650 -keysize 2048
```

## Exporting Packages

Exporting a package is fairly simple. You need to pass the de (directory export) parameter and the name of the package you want to export from vRO.

```
java -DserverUrl=administrator:Password@vra-appliance.corp.local:443 -DignoreServerCertificate=true -jar vco-cli-java-7.0.1.jar de com.company.test
```

After a successful export your directory structure should resemble the screenshot below.

![directory](/assets/images/directory.png)

## Building Packages

To build a package from an exported directory structure you will need to pass the fd (from directory) parameter and the path to the folder that contains the package contents.

You'll also notice two extra java parameters:

* -DkeystoreFileLocation - This is the path to the keystore that was created earlier.
* -DkeystorePassword - This is the password used to secure the keystore.

```
java -DserverUrl=administrator:Password@vra-appliance.corp.local:443 -DignoreServerCertificate=true -DkeystoreFileLocation=example.vmokeystore -DkeystorePassword=password123 -jar .\vco-cli-java-7.0.1.jar fd com.company.test
```

Your directory structure should now look like this:

![built](/assets/images/built.png)

The newly built package is now ready for import. You can see in the example below that the package has been signed with a custom certificate.

![import](/assets/images/import.png)

## Next Steps

Now that you have away to export your package to source, you could take it one step further and initialize the directory as a git repository.

Check out this example repository for reference: [https://github.com/chelnak/vro-package-example](https://github.com/chelnak/vro-package-example)

One thing to note is the contents of .gitignore. You want to avoid commiting things like your keystore to public facing repositories. ;-)

## Some notes / disclaimers

* This article is for demonstration purposes only. **Be wise and test before you use the process outside of a lab**.
* I stumbled across a lot of this when doing discovery work for vRO plugin development posts I did back in April. I'm sure that there were a few communities posts that hinted towards the existence of this tool but I can't find them now, so credit goes out to OP. You know who you are.
