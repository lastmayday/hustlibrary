'use strict';

app.controller('bgCtrl', function BgCtrl($scope, $timeout, libraryService, libraryStorage) {
  // init
  libraryService.updateData();
  
  // update the data every 720 mintues
  var interval = 720;
  
  chrome.alarms.create("scheduleRequest", {periodInMinutes: interval});
  
  chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name === "scheduleRequest"){
      $scope.$apply(
        libraryService.updateData
      );
    }
  });
});
