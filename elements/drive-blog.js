Polymer({
  blogTitle: 'Blog Title',
  articlesFolders: [],
  articles:[],
  aboutFileId: '',
  articlesMainFolderId:'',
  articleTitle: '',
  GASbackendUrl: '',
  socials:[],
  localStorageLoaded: function(){
    console.log('local storage loaded...');
    if (this.articles!=null){
      var element = this;
      //Update folder titles
      this.articlesFolders.forEach(function(item){
        var fetched = element.filterByFolder(element.articles,item.folderId);

        item.articlesCount=fetched.length;

      });
    }
  },
  loadArticles:function(folderId){
    var ajax = this.$.core_ajax;
    ajax.params='{"action":"getBlogPosts", "folderId":"'+folderId+'"}';
    ajax.go();//Execute the call
  },
  ready: function(){
    //if the About field is present, set the default route
    if(this.aboutFileId.length>0){
      //Push the about article to the article array
      this.articles.push({
        id:this.aboutFileId,
        title:'About',
        folderId:'',
        date:'2013-01-01t00:00:00.001z'
      });

    }
    //Set the default selected menu only if the routing is empty
    if (!this.route){
      //this.selectedMenu='About';
      this.route='articleList';
    }
    if (this.GASbackendUrl.length>0){
      //Parse the article Folders String
      var element = this;
      //Load Articles with AJAX from the backend
      this.articlesFolders.forEach(function(item){
        //Add the Article Count Variable
        item.articlesCount = 0;
        element.loadArticles(item.folderId);
      });
    }
  },
  handleResponse: function(response){
    if (response.detail.response.length>0){
      var fetched = response.detail.response;
      var element = this;
      var toAttach = [];
      fetched.forEach(function(item){
        var found=false;
        element.articles.some(function(article){
          if (article.id==item.id){
            article.title = item.title;
            article.date = item.date;
            found=true;
            return true;
          }else{
            return false;
          }
        });
        if(!found){
          toAttach.push(item);
        }
      });
      this.articles = this.articles.concat(toAttach);

      var folderId = fetched[0].folderId;
      var idxToDelete=[];
      //Search for removed articles
      this.articles.forEach(function(item,index){
        //Check the folder
        if (item.folderId==folderId){
          var found=false;
          //Search the article in the fetched
          fetched.some(function(fetchItem){
            if(fetchItem.id==item.id){
              found=true;
              return true;
            }else{
              return false;
            }
          });
          if (!found){
            idxToDelete.push(index);
          }
         }
       });

      //Remove the articles
      for(var i=(idxToDelete.length-1);i>=0;i--){
        this.articles.splice(i,1);
      }

      //Update the Articles Count of the proper Folder
      this.articlesFolders.some(function(item){
        if(item.folderId == folderId){
          item.articlesCount=fetched.length;
          return true;
        }
        return false;
      });
    }
  },
  filterByFolder: function(articles,folderId){
    var toRet=[];
    //Filter the list of articles for folderID
    articles.forEach(function(item){
      if(item.folderId == folderId){
        toRet.push(item);
      }
    });

    return toRet;
  },
  selectAction: function(e, detail) {
    if (detail.isSelected) {
      var selectedItem = detail.item.id;
      //Change the route if the selected Item is a page
      var isPage=false;
      this.articles.some(function(item){

        if (item.id==selectedItem){
          isPage=true;
          return true;
        }

        return false;
      });

      if (isPage){
        //change the route
        this.route=selectedItem;
        //Toggle the panel
      this.$.core_scaffold.togglePanel();
      }
    }
  },
  selectPage: function(e, detail) {
    if (detail.isSelected) {
      //Set the article Title
      this.articleTitle= detail.item.title;
    }
  },
  selectArticle: function(e, detail,sender) {
    //Set the route with the selected article id
    this.route=sender.id;
  }
});