function testDoPost(){
  var e = {};
  e.parameters={};
  e.parameters.action ='getBlogPosts';
  e.parameters.folderId = '0B0CnV_gvF2TgNm1RY2VQQVk5VTA';

  var result = doPost(e);

}

function doPost(e) {
  var HTMLToOutput;

  if (e.parameters.action){
    var toRet=[];

    //Get the Articles
    toRet=getPosts(e.parameters.folderId);
    
    return ContentService.createTextOutput(JSON.stringify(toRet))
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
      if (lastRev.published){
        toRet.push({ "id":file.id , "title":file.title });
      }
    }

  }


  return toRet;
}
