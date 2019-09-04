---
title: Using Apt-Get behind a http proxy (Ubuntu 10.10)
date: 2011-03-29T11:44:00+00:00
author: Craig
layout: post
permalink: /2011/03/using-apt-get-behind-http-proxy-ubuntu.html
categories:
  - Linux
---

If you are using Ubuntu server behind a proxy you will need to manually add it. There are a few ways of doing this but this is what worked for me..

<!--more-->

Usually when adding a proxy via the CLI in ubuntu you would use the http_proxy variables and add it to the /root/.bashrc file..

```PowerShell
http_proxy http://user:password@proxy:port/
export http_proxy
```

For some reason I have had a few issues with this but have found that editing /etc/apt/apt.conf with the following line works a treat.. I'm not to sure why but if it works it works.

```PowerShell
Acquire::http::Proxy http://proxy:port
```

Now run sudo ```apt-get update``` and you should see that apt is able to contact the necessary servers.
