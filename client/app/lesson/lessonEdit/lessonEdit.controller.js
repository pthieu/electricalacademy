'use strict';

angular.module('electricalacademyApp')
  .controller('LessonEditCtrl', function($scope, $http, $stateParams, $location) {
    _.sortRecursive = function(array, propertyName) {
      // Goes through each element in array
      array.forEach(function(item) {
        // Get the keys of each object in parent array
        var keys = _.keys(item);
        // Go through each key we just grabbed
        keys.forEach(function(key) {
          // Check if key in that one object in the parent array is an array
          if (_.isArray(item[key])) {
            // If it is, sort recursively sort it by the same field name, if that exists
            item[key] = _.sortRecursive(item[key], propertyName);
          }
        });
      });
      return _.sortBy(array, propertyName);
    };

    $http.get('/api/lessonLists').success(function(lessonList) {
      $scope.lessonList = _.sortRecursive(lessonList, 'order');
    });

    // Get a clean url stub by stripping out non-a-z chars
    $scope.updateStub = function() {
      var title = $scope.lessonTitle;
      var lesson_stub = '';
      if (!!title && title.length > 1) {
        // Greedy match all non-alphabetical characters, and then replace whitespace(1 or more) with dashes
        lesson_stub = title.replace(/[^a-zA-Z -]+/g, '').replace(/[- ]+/g, '-');
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
        $scope.redirect = true;
        $location.path('lesson/dashboard'); // Redirect to dashboard if success
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
