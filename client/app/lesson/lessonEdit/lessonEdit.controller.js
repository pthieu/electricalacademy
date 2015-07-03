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

    $http.get('/api/lessonLists').success(function(lessonList) {
      lessonList.push({
        'title': 'test',
        'order': lessonList.length,
      });
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
        $location.path('lessonList/edit/'+lesson.stub); // Redirect to dashboard if success
      }).error(function(data, status, headers, config) {
        $scope.errors.other = data.err;
      });

      //POST to server to create new content
      // $http.post('/api/lessons', );
      // Reset view
      // $scope.lessonTitle = '' // Clear input
      // $scope.lessonContent = '' // Clear input
    };



    // ANGULAR TREE UI STUFF
    $scope.removeNode = function(scope) {
      scope.remove();
    };

    $scope.toggleNode = function(scope) {
      scope.toggle();
    };

    $scope.moveLastToTheBeginning = function() {
      var a = $scope.lessonList.pop();
      $scope.lessonList.splice(0, 0, a);
    };

    $scope.newNodeSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.children.push({
        order: nodeData.children.length+1,
        title: nodeData.title + '.child.' + (nodeData.children.length + 1),
        stub: nodeData.stub + '.child.' + (nodeData.children.length + 1),
        children: []
      });
    };

    // $scope.collapseAll = function() {
    //   $scope.$broadcast('collapseAll');
    // };

    // $scope.expandAll = function() {
    //   $scope.$broadcast('expandAll');
    // };
  });
