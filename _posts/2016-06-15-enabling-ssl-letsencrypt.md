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
So recently I read about <a href="https://letsencrypt.org/">Let's Encrypt</a>. It's a pretty awesome service that provides free short-lived SSL certificates.

I thought it would be cool to share the steps I took to get my WordPress installation running Ubuntu/Apache set up&nbsp;with fresh SSL certificates&nbsp;and automated renewal.

<!--more-->

1. Make sure that port 443 is open on the firewall:
```ufw allow 443/tcp```
**Note:&nbsp;**I took an extra step here to remove the additional IPv6 rule that is created

2. Ensure that **ServerName** and **ServerAlias** are configured in the vhosts configuration file:
```https://httpd.apache.org/docs/current/vhosts/name-based.html#using```
3. Download certbot-auto and request a certificate by following the instructions here:
```https://certbot.eff.org/#ubuntutrusty-apache```
**Note**: Once certbot-auto had downloaded, I moved it to /usr/sbin/ so I could access it in my $PATH.

4. Update** WordPress Address (URL)** and **Site Address (URL)**&nbsp;under **Settings &gt; General** so WordPress knows that SSL is now being used:

<img class="alignnone size-full wp-image-754" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/06/wordpress.png" alt="LetsEncrypt" width="739" height="145" />

5. Create a redirect in **/etc/apache2/sites-enabled/000-default.conf** to push all requests to **https://www**:
```&lt;VirtualHost *:80&gt;
    ServerAdmin webmaster@localhost
    ServerName www.domain.co.uk
    ServerAlias domain.co.uk
    Redirect permanent / https://www.domain.co.uk/
&lt;/VirtualHost&gt;
```
6. Automate the certificate renewal with a cron job that runs **every day at 00:30**:
```30 00 * * *&nbsp;certbot-auto renew --post-hook "service apache2 restart" --quiet --no-self-upgrade```
**Note:** The** --post-hook** switch will restart apache only if the certificate is renewed

7. Restart apache
```service apache2 restart```
8. Finally I informed Google about the change by adding two new properties to my <a href="http://www.google.com/webmasters/">Webmaster Tools account</a>:
```https://domain.co.uk
https://www.domain.co.uk
```

9. For piece of mind, check the new configuration using <a href="https://www.ssllabs.com/ssltest/index.html">Qualys SSL Labs</a>:

<img class="alignnone size-full wp-image-756" src="https://www.helloitscraig.co.uk/wp-content/uploads/2016/06/SSLLabs.png" alt="LetsEncrypt" width="1001" height="394" />

The whole process took about 15 minutes. Worth the effort if you ask me :-)

<em>Disclaimer:&nbsp;Follow the above steps at your own risk and be sure to make backups of **any** configuration file you edit!</em>