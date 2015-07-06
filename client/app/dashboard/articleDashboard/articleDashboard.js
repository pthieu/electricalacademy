'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articleDashboard', {
        url: '/dashboard/articles',
        templateUrl: 'app/dashboard/articleDashboard/articleDashboard.html',
        controller: 'ArticleDashboardCtrl',
        authenticate: true
      });
  });