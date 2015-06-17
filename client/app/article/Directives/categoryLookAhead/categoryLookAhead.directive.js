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
        scope.filteredSuggestedTags = [];
        scope.selectedIndex = -1;

        scope.checkKeyDown = function(event) {
          if (event.keyCode === 40) { //down key, increment selectedIndex
            event.preventDefault();
            if(scope.selectedIndex+1 !== scope.filteredSuggestedTags.length){ // check to see if at end of list
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

        // Everytime we type something, we filter the tags to shorten the list since list might get VERY long
        scope.filterTags = function() {
          scope.selectedIndex = -1; // Reset to -1 so nothing is selected on change TODO: try to find out how to get closest match
          scope.filteredSuggestedTags = $filter('fuzzySearch')(scope.suggestedTags, scope.searchText, 'OR');
        }

        scope.addToSelectedTags = function (index) {
          if(scope.selectedTags.indexOf(scope.filteredSuggestedTags[index]) > -1) return; // Test to see if selectedTags already has this value
          scope.selectedTags.push(scope.filteredSuggestedTags[index]);
          scope.selectedTags = _.sortBy(scope.selectedTags); // Re-order the tags so we can find alphabetically
        };
      }
    };
  });
