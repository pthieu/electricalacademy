'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articleDashboard', {
        url: '/article/dashboard',
        templateUrl: 'app/article/articleDashboard/articleDashboard.html',
        controller: 'ArticleDashboardCtrl',
        authenticate: true
      });
  });