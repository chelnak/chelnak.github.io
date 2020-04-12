---
title: 'SharePoint 2010 - Importing user photos'
date: 2011-04-01T15:06:00+00:00
author: Craig
layout: post
permalink: /2011/04/sharepoint-2010-importing-user-photos.html
categories:
  - SharePoint
---

## This post assumes that

* You have **at least** got the October 2010 CU
* Photos are stored in the thumbnailPhoto attribute in Active Directory ([See here for instructions](http://www.helloitscraig.co.uk/2011/03/bulk-import-user-pictures-in-to-active-directory/)
* The User Profile Service Application is configured
* There is a synchronization connection to your Active Directory

<!--more-->

In Central Admin navigate to Manage Service Applications then select the User Profile Service Application from the list and click on manage from the ribbon.

Now select Manage User Properties from under the people heading. Once the page has loaded scroll down to and click on the Picture property. Select Edit from the drop down.

![PictureProperty](/assets/images/PictureProperty.png)

On the Properties page make sure `Do not allow users to edit values for this property` is selected then add a new mapping. Select your synchronisation connection, attribute you wish to map (thumbnailPhoto) and the direction, which in this case is Import.

![Sync](/assets/images/Sync.png)

Click add followed by OK.

Once the mapping has been added navigate back to the User Profile Service Application and select Start Profile Synchronisation. Select Start Full Synchronization then click OK.This will begin to sync all users and specified properties with your Active Directory.

![StartSync](/assets/images/StartSync.png)

To verify that the sync is successfully operating load up miisclient.exe. The executable can be found at `C:Program FilesMicrosoft Office Servers14.0Synchronization ServiceUIShellmiisclient.exe`. Obviously the path will vary depending on where you installed the server.

![MIISCLIENT](/assets/images/MIISCLIENT.png)

As the service imports the users and information into SharePoint you will notice that a number of updates are appearing in the Synchronisation Statistics section. Click on the Updates link and select a user from the list. In the information displayed the thumbnailPhoto attribute should (if the sync has been a success) be populated with a hexadecimal value.

Finally the `Update-SPProfilePhotoStore` cmdlet to re-size the the photos so that they can be used in all the right places around SharePoint.

Open the SharePoint 2010 Management Shell with a user account that has the correct privileges to administer SharePoint and type the following.

```powershell
Update-SPProfilePhotoStore -MySiteHostLocation http://my.domain.com/-CreateThumbnailsForImportedPhotos $True
```

Once the above command has completed successfully then users photo should now be displayed on their My Site Profile page.

![UserProf1](/assets/images/UserProf1.png)
