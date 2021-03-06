'use strict';

angular.module('electricalacademyApp')
  .controller('LessonCtrl', function($scope, $http, $location) {
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
      var hasIntroduction = _.some($scope.lessonList, function (lesson) {
        return lesson.lessonRef === 'introduction'
      });
      // Below redirect is to just skip the announcement section since we don't have one yet, also makes sure
      // we don't redirect if we're already looking at a specific lesson
      if (hasIntroduction && $location.url().match(/\/lesson$/)){
        // Redirect to introduction if it exists, ensures /lesson loads in case introduction doesn't exist
        $location.url('/lesson/introduction');
      }
    });
  });
