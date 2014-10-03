var BLOG_FOLDER_ID_IT = '0B0CnV_gvF2TgWUltT1NoWUNFNzA';
var BLOG_FOLDER_ID_EN = '0B0CnV_gvF2TgMm9oX3dWWEU5ZG8';


function testNewGet(){
  var e = {};
  e.parameters={};
  e.parameters.action ='getBlogPosts';
  e.parameters.language ='EN';
  e.parameters.callback ='ciccioli';

  var result = doGet(e);

}

function doGet(e) {
  var HTMLToOutput;

  if (e.parameters.action){
    var toRet=[];

    if (e.parameters.language =='IT'){
      toRet=getPosts(BLOG_FOLDER_ID_IT);
    }else{
      toRet=getPosts(BLOG_FOLDER_ID_EN);
    }

    return ContentService.createTextOutput(e.parameters.callback + '('+JSON.stringify(toRet)+')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);

  }
  //No Callback hacks Needed!!! \o/
}

function getPosts(parentFolderId){

  var toRet=[];
  var fileListJSON = [];

  //Search files with a specific parent, not trashed and Google Docs Only
  //Get only id and tile everything else is not needed
  var fileList = Drive.Files.list(
    {
      q: '"'+parentFolderId+'" in parents '+
      ' and trashed=false '+
      ' and mimeType="application/vnd.google-apps.document"',
      fields: "items(id,title)"
    });

  //Loop Over the file list and get the revisions
  for (var i in fileList.items){
    var file = fileList.items[i];

    //Get the revisions for the file
    var revisions = Drive.Revisions.list(file.id);

    if (revisions.items.length>0){
      var lastRev = revisions.items[(revisions.items.length-1)];
      if (lastRev.published){
        toRet.push({ "fileId":file.id , "title":file.title });
      }
    }

  }


  return toRet;
}
