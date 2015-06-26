'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lesson', {
        url: '/lesson',
        templateUrl: 'app/lesson/lesson.html',
        controller: 'LessonCtrl'
      });
  });