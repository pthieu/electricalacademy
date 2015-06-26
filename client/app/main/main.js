'use strict';

angular.module('electricalAcademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          $title: function () { return 'Home'; }
        }
      });
  });