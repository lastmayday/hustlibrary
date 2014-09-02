'use strict';

app.factory('libraryService', function($http, libraryStorage, icon){
  var login_url = 'https://ftp.lib.hust.edu.cn/patroninfo*chx~S0';
  var book_url = 'https://ftp.lib.hust.edu.cn/patroninfo~S0*chx/';
  var page = "";
  var ERROR = {
    NOT_LOGIN: 1,
    REQUEST_FAILED: 2
  };

  var getLogin = function(user_name, user_id){
    var deferred = Q.defer();
    $.ajax({
      url: login_url,
      type: "POST",
      data: {'name': user_name, 'code': user_id, 'submit.x': 66, 'submit.y': 14, 'submit': "submit"},
      success: function(data){
        var uid_re = /patroninfo\*chx\/(\d+)\/?/;
        var uid_data = data.match(uid_re);
        var uid = uid_data[1];
        book_url = book_url + uid + '/items'
        $http.get(book_url).then(function(response){
          deferred.resolve(response.data);
        });
      }
    });
    return deferred.promise;
  };

  var getItems = function(books){
    var resp = {
      allItems: [],
      info: ""
    };
    var $books  = $(books);
    var $items = $books.find(".patFuncEntry");
    resp.info = $books.find(".patStatusLinks").text();
    var reg = /(\d{2})-(\d{2})-(\d{2})/;
    var deferred = Q.defer();
    for(var i=0; i<$items.length; i++){
      var $item = $items.eq(i);
      var title = $item.find(".patFuncTitle").find("a").text();
      var status = $item.find(".patFuncStatus").text();
      var danger = false;
      var money = false;
      if(status){
        var date = status.match(reg);
        var today = new Date();
        var deadline = new Date('20'+date[1], parseInt(date[2])-1, date[3], 17);
        var days = deadline.getTime() - today.getTime();
        days = parseInt(days / (1000 * 60 * 60 * 24));
        if(days >= 0 && days <= 4){
          danger = true;
        }
      }
      var code = $item.find(".patFuncCallNo").text();
      var data = {'title': title, 'status': status, 'code': code, "danger": danger, "money": money};
      resp.allItems.push(data);
    }
    deferred.resolve(resp);
    return deferred.promise;
  };

  var getEvents = function(resp){
    var events = {
      books: [],
      deadlines: 0,
      info: ''
    };
    var items = resp.allItems;
    events.info = resp.info;
    for(var i=0; i<items.length; i++){
      var item = items[i];
      if(item.danger){
        events.deadlines ++;
      }
      events.books = events.books.concat(item);
    }
    return events;
  };

  var getBooks = function(){
    var deferred = Q.defer();
    var user_name = libraryStorage.getUserName();
    var user_id = libraryStorage.getUserID();
    getLogin(user_name, user_id).then(getItems).then(function(resp){
      var events = getEvents(resp);
      deferred.resolve(events);
    }, function(reason){
      deferred.reject(reason);
    });
    return deferred.promise;
  };

  var updateData = function(){
    libraryStorage.reNew();
    icon.initIcon();
    getBooks().then(function(events){
      if(events){
        var books = events.books;
        var deadlines = events.deadlines;
        var info = events.info;
        libraryStorage.setBooks(books);
        libraryStorage.setDeadlines(deadlines);
        libraryStorage.setInfo(info);
      }
      libraryStorage.unNew();
      icon.updateIcon();
    }, function(reason){
      console.log("failed", reason);
      switch (reason) {
      case ERROR.NOT_LOGIN:
        libraryStorage.signOut();
        break;
      case ERROR.REQUEST_FAILED:
        libraryStorage.removeExpiredDeadlines();
        break;
      default:
      }
      libraryStorage.unNew();
      icon.updateIcon();
    });
  };

  return {
    updateData: updateData
  };
});
