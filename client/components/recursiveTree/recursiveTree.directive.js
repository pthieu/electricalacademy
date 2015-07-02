'use strict';

angular.module('electricalacademyApp')
  .directive('recursiveTree', function () {
    return {
      templateUrl: 'components/recursiveTree/recursiveTree.html',
      restrict: 'E',
      scope: {
        list: '=',
      },
      link: function (scope, element, attrs) {
      	
      }
    };
  });