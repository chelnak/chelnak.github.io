---
title: 'Enabling SSL with Let&#8217;s Encrypt'
date: 2016-06-15T10:00:59+00:00
author: Craig
layout: post
permalink: /2016/06/enabling-ssl-letsencrypt.html
categories:
  - General
  - Linux
tags:
  - LetsEncrypt
  - vExpert
---
So recently I read about [Let's Encrypt](https://letsencrypt.org). It's a pretty awesome service that provides free short-lived SSL certificates.

I thought it would be cool to share the steps I took to get my WordPress installation running Ubuntu/Apache set up with fresh SSL certificates and automated renewal.

<!--more-->

* Make sure that port 443 is open on the firewall:

```Bash
ufw allow 443/tcp
```

> **Note:** I took an extra step here to remove the additional IPv6 rule that is created

* Ensure that `ServerName` and `ServerAlias` are configured in the vhosts configuration file:

```Bash
https://httpd.apache.org/docs/current/vhosts/name-based.html#using
```

* Download certbot-auto and request a certificate by following the instructions here:

```Bash
https://certbot.eff.org/#ubuntutrusty-apache
```

> **Note**: Once certbot-auto had downloaded, I moved it to /usr/sbin/ so I could access it in my $PATH.

* Update** WordPress Address (URL)** and **Site Address (URL)** under **Settings > General** so WordPress knows that SSL is now being used:

![wordpress](/assets/images/wordpress.png)

* Create a redirect in **/etc/apache2/sites-enabled/000-default.conf** to push all requests to **https**:

```XML
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName www.domain.co.uk
    ServerAlias domain.co.uk
    Redirect permanent / https://www.domain.co.uk/
</VirtualHost>
```

* Automate the certificate renewal with a cron job that runs **every day at 00:30**:

```Bash
30 00 * * *certbot-auto renew --post-hook "service apache2 restart" --quiet --no-self-upgrade
```

> **Note:** The** --post-hook** switch will restart apache only if the certificate is renewed

* Restart apache

```Bash
service apache2 restart
```

* Finally I informed Google about the change by adding two new properties to my [Webmaster Tools account](http://www.google.com/webmasters/):

```Bash
https://domain.co.uk
https://www.domain.co.uk
```

* For piece of mind, check the new configuration using [Qualys SSL Labs](https://www.ssllabs.com/ssltest/index.html):

![SSLLabs](/assets/images/SSLLabs.png)

The whole process took about 15 minutes. Worth the effort if you ask me :-)

> :rotating_light: Disclaimer: Follow the above steps at your own risk and be sure to make backups of **any** configuration file you edit!
