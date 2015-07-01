'use strict';

angular.module('electricalacademyApp')
  .controller('LessonFocusCtrl', function ($scope, $stateParams, $http) {
  	$scope.lessonStub = (typeof $stateParams.lesson_stub === 'undefined' || $stateParams.lesson_stub === '') ? null : $stateParams.lesson_stub;
    
    $http.get('/api/lessons/'+$scope.lessonStub).success(function(lesson) {
      // Truncate content for each article so dashboard isn't cluttered
      $scope.title = lesson.title;
      $scope.content = lesson.content;
    });
  });
