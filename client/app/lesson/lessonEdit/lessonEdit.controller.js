'use strict';

angular.module('electricalacademyApp')
  .controller('LessonEditCtrl', function($scope, $http, $stateParams, $location) {
    $scope.errors = {}; // initialize errors

    // Either we're editing an existing lesson or creating a new one, we can figure this out from params in url
    $scope.lessonID = (typeof $stateParams.lesson_id === 'undefined' || $stateParams.lesson_id === '') ? null : $stateParams.lesson_id;
    $scope.lessonExists = false; // Initialize lesson flag to either call a post or put later


    // If lessonID exists from URL bar, we call web services to grab info and populate
    if(!!$scope.lessonID){
      $http.get('/api/lessons/lessonById/'+$scope.lessonID).success(function(lesson) {
        // If lesson is found, we the form with the existing lesson for edit
        $scope.lessonTitle = lesson.title;
        $scope.lessonStub = lesson.stub;
        $scope.lessonOrder = lesson.order;
        $scope.lessonContent = lesson.content;
        $scope.lessonExists = true;
      }).error( function (data, status, headers, config) {
        $scope.lessonExists = false;
      });
    }

    // Get a clean url stub by stripping out non-a-z chars
    $scope.updateStub = function() {
      var title = $scope.lessonTitle;
      var lesson_stub = '';
      if (!!title && title.length > 1) {
        // Greedy match all non-alphabetical characters, and then replace whitespace(1 or more) with dashes
        lesson_stub = title.toLowerCase().replace(/[^a-zA-Z -]+/g, '').replace(/[- ]+/g, '-');
      } else {
        lesson_stub = title;
      }
      $scope.lessonStub = lesson_stub;
    };

    $scope.createLesson = function($event) {
      $event.stopPropagation();

      var req = {
        method: ($scope.lessonExists) ? 'PUT' : 'POST', // Either a create new or an update, the routes are differentiated so server knows
        url: ($scope.lessonExists) ? '/api/lessons/' + $scope.lessonID : '/api/lessons', // same as above
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          order: $scope.lessonOrder,
          title: $scope.lessonTitle,
          stub: $scope.lessonStub,
          content: $scope.lessonContent,
        }
      }

      $http(req).success(function(lesson, status, headers, config) {
        var redirect = (!!$scope.lessonID) ? '/dashboard/lessons' : 'lessonList/edit/'+lesson.stub;
        $location.path(redirect); // Redirect to dashboard if success
      }).error(function(data, status, headers, config) {
        $scope.errors.other = data.err;
      });

      //POST to server to create new content
      // $http.post('/api/lessons', );
      // Reset view
      // $scope.lessonTitle = '' // Clear input
      // $scope.lessonContent = '' // Clear input
    };
  });
