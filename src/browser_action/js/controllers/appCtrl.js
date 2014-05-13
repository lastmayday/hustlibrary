/*global todomvc */
'use strict';
app.controller('appCtrl', function LibraryCtrl($scope, libraryStorage, libraryService, icon){

  $scope.books = libraryStorage.getBooks();

  var isSignedIn = libraryStorage.isSignedIn();
  $scope.displaySignIn = !isSignedIn;
  $scope.signIn = function(){
    var user_name = $("#user_name").val();
    var user_id = $("#user_id").val();
    libraryStorage.setUserID(user_id);
    libraryStorage.setUserName(user_name);
    libraryStorage.signIn();
    $scope.displayLoading = true;
    $scope.displaySignIn = false;
    libraryService.updateData();
  };

   var isNew = libraryStorage.isNew();
   $scope.displayLoading = isSignedIn && isNew;
   if($scope.displayLoading){
	   libraryService.updateData();
   }

   $scope.displayBooks = !isNew && isSignedIn;
   
   var info = $.trim(libraryStorage.getInfo());
   $scope.booksInfo = info;
   $scope.displayInfo = info.length ? true : false;
   
   $scope.open = function(){
    chrome.tabs.create({'url': 'https://ftp.lib.hust.edu.cn/'})
  };
});
