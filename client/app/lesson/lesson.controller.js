'use strict';

angular.module('electricalacademyApp')
  .controller('LessonCtrl', function($scope, $http) {
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
  });
