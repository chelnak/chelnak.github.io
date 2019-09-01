---
title: Unable to cancel running workflow in vRO
date: 2016-02-24T16:38:07+00:00
author: Craig
layout: post
permalink: /2016/02/cancelling-stuck-vro-workflows-via-the-control-center.html
categories:
  - vRealize Orchestrator
tags:
  - vExpert
  - vRO
---
Whilst working on a set of multi-node workflows I ended up with a run that was stuck in a loop of doom. For one reason or another it could not be cancelled via the GUI and it was beginning to have an effect on the overall performance of the server.

On an off chance I decided to check out the new Control Center that was introduced in <a href="https://www.vmware.com/support/orchestrator/doc/vrealize-orchestrator-601-release-notes.html">version 6.0.1</a> to see if it offered any clues on how to stop the erroneous run without effecting the other active users.

I found exactly what I needed under **<a href="http://pubs.vmware.com/orchestrator-70/index.jsp#com.vmware.vrealize.orchestrator-install-config.doc/GUID-E1AFA34C-FC89-4D0C-9E4E-F174AB554C75.html?resultof=%2522%2563%2561%256e%2563%2565%256c%2522%2520%2522%2577%256f%2572%256b%2566%256c%256f%2577%2522%2520">Monitoring and Control\TroubleShooting</a>.**

<!--more-->
<h2>Cancelling workflow runs via vRO Control Center</h2>
Grab the ID of the running workflow from vRO.

<img class="alignnone wp-image-534 size-full" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/02/WFID.png" alt="WFID" width="460" height="141" />

Now open a browser and navigate to: **https://[yourvroserver]:8283/vco-controlcenter/**

When prompted, login with **root** and the same password you would use to access the VAMI.

From the **Monitoring and Control** section, select **Troubleshooting**.

<img class="alignnone size-medium wp-image-533" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/02/Monitoring-1-300x95.png" alt="vco-controlcenter" width="300" height="95" />

Paste the workflow id in to the **Cancel all tokens of a workflow** text box and click **Cancel runs.**

<img class="alignnone size-full wp-image-531" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/02/Cancel.png" alt="Cancel" width="746" height="81" />

Alternatively, you can cancel individual workflow tokens.

Grab the token id from the General tab of the running workflow.

<img class="alignnone size-full wp-image-538" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/02/tokenid.png" alt="tokenid" width="345" height="91" />

Then back in the Control Center, paste the id in to the **Cancel tokens by ID** text box and click **Cancel runs**.

<img class="alignnone size-full wp-image-539" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/02/tokens.png" alt="tokens" width="739" height="78" />

If everything goes to plan you should see the following message appear on the page:

<img class="alignnone size-full wp-image-535" src="http://www.helloitscraig.co.uk/wp-content/uploads/2016/02/success.png" alt="success" width="751" height="72" />
<h2>Working with the vRO Control Center API</h2>
The new Control Center has a pretty decent API too and provides the ability to carry out the above task programmatically.

Here is a quick example showing how to get the job done with PowerShell:

<script src="https://gist.github.com/chelnak/200b73bf5795d1191b16.js"></script>

For more information about the features supported by the API, check out the docs on the appliance (**https://[yourvroserver]:8283/vco-controlcenter/docs**).