'use strict';

angular.module('electricalacademyApp')
  .controller('LessonListEditCtrl', function($scope, $http, $stateParams, $location) {

    $scope.lessonStub = (typeof $stateParams.lesson_stub === 'undefined' || $stateParams.lesson_stub === '') ? null : $stateParams.lesson_stub;

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
    if (!!$scope.lessonStub) {
      $http.get('/api/lessons/lessonByStub/' + $scope.lessonStub).success(function(lesson) {
        $scope.lessonList.push({
          'title': lesson.title,
          'lessonRef': lesson.stub,
          'order': lesson.order,
          'children': []
        });
      });
    }

    $scope.cancelEdit = function (event) {
      $location.url('dashboard/lessons');
    }

    // ANGULAR TREE UI STUFF
    // $scope.removeNode = function(scope) {
    //   scope.remove();
    // };

    // $scope.toggleNode = function(scope) {
    //   scope.toggle();
    // };

    // $scope.moveLastToTheBeginning = function() {
    //   var a = $scope.lessonList.pop();
    //   $scope.lessonList.splice(0, 0, a);
    // };

    $scope.newNodeSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.children.push({
        order: nodeData.children.length + 1,
        title: nodeData.title + '.child.' + (nodeData.children.length + 1),
        stub: nodeData.stub + '.child.' + (nodeData.children.length + 1),
        children: []
      });
    };

    $scope.updateLessonList = function ($event) {
      var req = {
        method: 'PUT',
        url: '/api/lessonLists/',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          list: $scope.lessonList,
        }
      }

      $http(req).success(function(lesson, status, headers, config) {
        debugger;
        var redirect = '/'
        // $location.path(redirect); // Redirect to dashboard if success
      }).error(function(data, status, headers, config) {
        debugger;
        $scope.errors.other = data.err;
      });
    };

    // $scope.collapseAll = function() {
    //   $scope.$broadcast('collapseAll');
    // };

    // $scope.expandAll = function() {
    //   $scope.$broadcast('expandAll');
    // };
  });
