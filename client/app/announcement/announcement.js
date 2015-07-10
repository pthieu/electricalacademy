'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('announcement', {
        url: '/announcement',
        templateUrl: 'app/announcement/announcement.html',
        controller: 'AnnouncementCtrl',
        resolve: {
          $title: function ($stateParams) { return 'Announcements'; },
          $description: function () { return 'Electrical Academy - Announcements, updates, and news regarding the site and world technology'; }
        }
      });
  });