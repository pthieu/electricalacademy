'use strict';

angular.module('electricalacademyApp')
  .controller('LessonFocusCtrl', function ($scope, $stateParams, $http) {
    $scope.lessonStub = (typeof $stateParams.lesson_stub === 'undefined' || $stateParams.lesson_stub === '') ? null : $stateParams.lesson_stub;
    
    $http.get('/api/lessons/'+$scope.lessonStub).success(function(lesson) {
      // Update meta description with valid stuff
      $scope.$root.$title = lesson.title;
      $scope.$root.$description = 'Learn electronics and electrical engineering principles - Lesson: '+lesson.title;

      $scope.title = lesson.title;
      $scope.content = lesson.content;
    });
  });
