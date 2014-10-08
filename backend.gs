function testDoPost(){
  var e = {};
  e.parameter={};
  e.parameter.action ='getBlogPosts';
  e.parameter.folderId = 'YOUR_FOLDER_ID';

  var result = doPost(e);
  result = result;
}
function doGet(e){
    //return the input params (mostly for debug)
    return ContentService.createTextOutput('PLEASE USE POST')
    .setMimeType(ContentService.MimeType.TEXT);

}
function doPost(e) {

  if (e.parameter.action){
    var toRet=[];

    //Get the Articles
    toRet=getPosts(e.parameter.folderId);

    return ContentService.createTextOutput(JSON.stringify(toRet))
    .setMimeType(ContentService.MimeType.JSON);

  }else{
    //return the input params (mostly for debug)
    return ContentService.createTextOutput(JSON.stringify(e))
    .setMimeType(ContentService.MimeType.JSON);
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
      //Return only published files
      if (lastRev.published){
        toRet.push({ "id":file.id , "title":file.title, "folderId":parentFolderId });
      }
    }

  }


  return toRet;
}
