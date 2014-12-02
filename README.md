[![Stories in Ready](https://badge.waffle.io/SmokyBob/driveception.png?label=ready&title=Ready)](https://waffle.io/SmokyBob/driveception)
driveception
============

Simple Blog hosted on Google Drive, with Google Apps Script backend and Articles wrote in Google Docs and published using the Publishing feature

##How to Install

###Backend:

1. Create a new Google Apps Script project as a Blank Project
2. Copy the content from backend.gs
3. Paste the content into the Google Apps Script project
4. Save
5. Click on Resources\Advanced Google Services
6. Scroll to Drive API and click on the off slider to turning it into on
7. Click on the Google Developers Console link at the bottom of the popup dialog
8. Filter the api list for Drive
9. Turn on Drive API (clicking on the OFF button)
10. Close the Google Developer Console tab
11. Click OK on the Google Apps Script Advanced Service button
12. Manage versions (File\Manage Versions...) to create a new one
13. Give a name (ex. Initial) and hit Save New Version, then close the Dialog
14. Time to publish the script (Publish\Deploy as a web app...)
15. In the dialog select Execute the app as: me, Who has access to the app:Anyone,even anonymous
16. Click Ok, Copy the link from the new popup
17. Inside index.html use the link for the GASbackendUrl parameter of the drive-blog custom element
18. Run the testDoPost function to authorize the script to access Google Drive with your user
17. You can now close the script

###Site Hosting:

You can host the site on any service that is able to serve HTML,JS and CSS (basically every service you can think) as no serverside code is needed.

One option is to [host the site on Google Drive](https://support.google.com/drive/answer/2881970?hl=en)


###Configuring the drive-blog element:

Before uploading files to the server, remember to configure the drive-blog element inside index.html


`blogTitle`: set the title you want your blog to have

`articlesFolders`: array of objects with the following structure:

    `folderId`: the Google Drive File Id of the Folder the articles will be

    `title`: the title to show in the menu

`aboutFileId`: Optional, the Id of the Google Doc used for the About menu link, if not set the About menu will not be shown

`GASbackendUrl`: the URL to the GAS script created before

`articlesMainFolderId`: used for the menu "Articles - Drive Folder" menu

`socials`: array of objects with the following structure:
  
    `name`: The label displayed in the menu
  
    `url`: the url associated to the menu item

###Uploading/Publishing the site:

You can upload the folder structure including the bower_components folder, but it's highly recommended to use the [vulcanize command](https://github.com/polymer/vulcanize) with --inline --csp --strip

Ex. vulcanize index.html --csp --inline --strip

This way in the vulcanize.html and vulcanize.js files all the code needed for the site is present without additional components that are not used. (plus less request and smaller files).
