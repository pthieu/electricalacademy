'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lesson', {
        url: '/lesson',
        templateUrl: 'app/lesson/lesson.html',
        controller: 'LessonCtrl',
        resolve: {
          $title: function () { return 'Lessons'; },
          $description: function () { return 'Learn electronics and electrical engineering principles'; }
        }
      });
  });