'use strict';

app.factory('libraryStorage', function () {
  var REMOVED_STORAGE_ID = 'library_removed';
  var BOOKS_STORAGE_ID  =  "library_books";
  var BOOKS_STORAGE_INFO = "library_info";
  var DEADLINES_STORAGE_COUNT = "library_deadlines";
  var IS_NEW_STORAGE_ID = "new";
  var USER_STORAGE_ID = "user_id";
  var USER_STORAGE_NAME = "user_name";
  var IS_SIGNED_IN_STORAGE_ID = "sign_in";

  var isNew = function(){
    return JSON.parse(localStorage.getItem(IS_NEW_STORAGE_ID) || '1');
  };

  var reNew = function(){
    localStorage.setItem(IS_NEW_STORAGE_ID, '1');
  };

  var unNew = function(){
    localStorage.setItem(IS_NEW_STORAGE_ID, '0');
  };
  
  var getRemoved = function(){
    return JSON.parse(localStorage.getItem(REMOVED_STORAGE_ID) || '[]');
  };
  var setRemoved = function(removedDeadlines){
    localStorage.setItem(REMOVED_STORAGE_ID, JSON.stringify(removedDeadlines));
  };

  var getBooks = function(){
    return JSON.parse(localStorage.getItem(BOOKS_STORAGE_ID) || '[]');
  };

  var setBooks = function(books){
    localStorage.setItem(BOOKS_STORAGE_ID, JSON.stringify(books));
  };
  
  var getInfo = function(){
    return JSON.parse(localStorage.getItem(BOOKS_STORAGE_INFO) || '0');
  };

  var setInfo = function(info){
    localStorage.setItem(BOOKS_STORAGE_INFO, JSON.stringify(info));
  };

  var getDeadlines = function(){
    return JSON.parse(localStorage.getItem(DEADLINES_STORAGE_COUNT) || '0');
  };

  var setDeadlines = function(deadlines){
    localStorage.setItem(DEADLINES_STORAGE_COUNT, JSON.stringify(deadlines));
  };

  return {
    isNew: isNew,

    reNew: reNew,

    unNew: unNew,

    getRemoved: getRemoved,

    setRemoved: setRemoved,

    getBooks: getBooks,

    setBooks: setBooks,
	
    getInfo: getInfo,
	
    setInfo: setInfo,

    getDeadlines: getDeadlines,

    setDeadlines: setDeadlines,

    getUserID: function(){
      return JSON.parse(localStorage.getItem(USER_STORAGE_ID) || '0');
    },
    
    setUserID: function(user_id){
      localStorage.setItem(USER_STORAGE_ID, JSON.stringify(user_id));
    },

    getUserName: function(){
      return JSON.parse(localStorage.getItem(USER_STORAGE_NAME) || '0');
    },
    
    setUserName: function(user_name){
      localStorage.setItem(USER_STORAGE_NAME, JSON.stringify(user_name));	
    },
    
    reset: function(){
      localStorage.removeItem(IS_SIGNED_IN_STORAGE_ID);
      localStorage.removeItem(USER_STORAGE_ID);
      localStorage.removeItem(USER_STORAGE_NAME);
      localStorage.setItem(BOOKS_STORAGE_ID, '[]');
      localStorage.setItem(DEADLINES_STORAGE_COUNT, '0');
      localStorage.setItem(REMOVED_STORAGE_ID, '[]');
    },
    
    isSignedIn: function(){
      return JSON.parse(localStorage.getItem(IS_SIGNED_IN_STORAGE_ID) || '0');
    },
    
    signIn: function(){
      localStorage.setItem(IS_SIGNED_IN_STORAGE_ID, '1');
    }, 

    signOut: function(){
      localStorage.setItem(IS_SIGNED_IN_STORAGE_ID, '0');
    }
  };
});
