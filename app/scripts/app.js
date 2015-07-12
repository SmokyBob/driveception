/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  
  //Configure app parameters here
  app.backendUrl = 'https://script.google.com/macros/s/AKfycbwUTpDFOpFxblYhrK8g7NN_IxbhhOTpzCZJo3ZNAFXWAPVlOPKA/exec';
  app.aboutFileId = '1HNhQgOjP4xXTPMKEW94tz54baijIBH4XiLaM4-hn0u8'; //Optional
  app.folders = [{folderId: '0B0CnV_gvF2TgNm1RY2VQQVk5VTA', title: 'Articoli - IT'},
                 {folderId: '0B0CnV_gvF2TgMDNINGZ3QnZsR0U', title: 'Articles - EN'}];
  app.socials = [];
  
  app.title = 'DriveCeption';

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

})(document);
