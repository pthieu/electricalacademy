'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          $title: function () { return 'Electrical Academy - Electrical Engineering and electronics learning and tutorials for free!'; },
          $description: function () { return 'The best place to learn electronics or electrical engineering principles for free!'; }
        }
      });
  });