[![Stories in Ready](https://badge.waffle.io/SmokyBob/driveception.png?label=ready&title=Ready)](https://waffle.io/SmokyBob/driveception)
driveception
============

Simple Blog hosted on Google App Engine, with Google Apps Script backend and Articles wrote in Google Docs published using the Publishing feature

##How to Install

###Backend:

1. Create a new Google Apps Script project as a Blank Project
2. Copy the content from backend.gs
3. Paste the content into the Google Apps Script project
4. Save
5. Click on Resources\Advanced Google Services
6. Scroll to Drive API and click on the `off` slider to turning it `on`
7. Click on the Google Developers Console link at the bottom of the popup dialog
8. Filter the API list for Drive
9. Turn on Drive API (clicking on the `OFF` button)
10. Close the Google Developer Console tab
11. Click OK on the Google Apps Script Advanced Service button
12. Manage versions (File\Manage Versions...) to create a new one
13. Give a name (ex. `Initial`) and hit Save New Version, then close the Dialog
14. Time to publish the script (`Publish\Deploy as a web app...`)
15. In the dialog select Execute the app as: `me`, Who has access to the app: `Anyone,even anonymous`
16. Click Ok, Copy the link from the new popup
17. Inside `app\scripts\app.js` use the link for the `app.backendUrl` varialble
18. Run the `testDoPost` function of the script to authorize access to Google Drive with your user from the script
17. You can now close the script

###Site Hosting:

You can host the site on any service that is able to serve HTML,JS and CSS (basically every service you can think) as no serverside code is needed.

One option is to [host the site on Google Drive](https://support.google.com/drive/answer/2881970?hl=en)

But for best performance and awesomeness provided by Service Workers, the gulp task `build:ae` build the site to be deployed on Google App Engine with ease.


###Configuring the application:

Before building the app and upload the `dist` folder to the server, remember to configure the application parameters inside `app\scripts\app.js`


`blogTitle`: set the title for your blog

`folders`: array of objects with the following structure:

--`folderId`: the Google Drive File Id of the Folder the articles will be
--`title`: the title to show in the menu

`aboutFileId`: Optional, the Id of the Google Doc used for the About menu link, if not set the About menu will not be shown

`backendUrl`: the URL to the GAS script created before

`socials`: array of objects with the following structure:

--`name`: The label displayed in the menu
--`url`: the url associated to the menu item

###Uploading/Publishing the site:

After downloading the source, run `npm install && bower install`, this should install all the tools needed for the build.

To test the app run `gulp serve` the site should be accessible at `localhost:3000`

To build the app run `gulp` and the site will be available for publishing inside the `dist` folder

For a build ready to be deployed on Google App Engine:
- edit `application` and `version` in `app.yaml`
- run `gulp build:ae`
- go to the `dist` folder and run `appcfg.py update .` 