'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lessonDashboard', {
        url: '/dashboard/lessons',
        templateUrl: 'app/dashboard/lessonDashboard/lessonDashboard.html',
        controller: 'LessonDashboardCtrl'
      });
  });