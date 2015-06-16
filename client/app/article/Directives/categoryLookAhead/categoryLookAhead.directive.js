'use strict';

angular.module('portfolioApp')
  .directive('categoryLookAhead', function($interval, $filter) {
    return {
      templateUrl: 'app/article/Directives/categoryLookAhead/categoryLookAhead.html',
      restrict: 'E',
      scope: {
        suggestedTags: '=',
        selectedTags: '='
      },
      link: function(scope, element, attrs) {
        scope.selectedTags = [];
        scope.selectedIndex = -1;

        scope.checkKeyDown = function(event) {
          if (event.keyCode === 40) { //down key, increment selectedIndex
            event.preventDefault();
            if(scope.selectedIndex+1 !== scope.suggestedTags.length){ // check to see if at end of list
              scope.selectedIndex++;
            }
          } else if (event.keyCode === 38) { //up key, decrement selectedIndex
            event.preventDefault();
            if(scope.selectedIndex-1 !== -1){ // check to see if at top of list
              scope.selectedIndex--;
            }
          } else if (event.keyCode === 13) { //enter pressed
            event.preventDefault();
            scope.addToSelectedTags(scope.selectedIndex); //adds to selected tags
          }
        }

        scope.searchTags = function() {
        }

        scope.addToSelectedTags = function (index) {
          if(scope.selectedTags.indexOf(scope.suggestedTags[index]) > -1) return; // Test to see if selectedTags already has this value
          scope.selectedTags.push(scope.suggestedTags[index]);
        };
      }
    };
  });
