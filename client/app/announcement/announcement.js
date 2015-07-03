'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('announcement', {
        url: '/announcement',
        templateUrl: 'app/announcement/announcement.html',
        controller: 'AnnouncementCtrl'
      });
  });