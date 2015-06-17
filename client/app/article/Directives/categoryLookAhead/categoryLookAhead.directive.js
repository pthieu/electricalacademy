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
        scope.unknownTags = []; // For tags that's not in DB already
        scope.newTags = []; // For tags that's recently added AND EXISTS IN DB
        scope.selectedIndex = -1;

        scope.checkKeyDown = function(event) {
          if (event.keyCode === 40) { //down key, increment selectedIndex
            event.preventDefault();
            if(scope.selectedIndex+1 !== scope.filteredSuggestedTags.length){ // check to see if at end of list
              scope.selectedIndex++;
            }
          console.log(scope.selectedTags)
          console.log(scope.filteredSuggestedTags)
          console.log(scope.selectedTags.indexOf(scope.filteredSuggestedTags[scope.selectedIndex]))
          } else if (event.keyCode === 38) { //up key, decrement selectedIndex
            event.preventDefault();
            if(scope.selectedIndex-1 !== -1){ // check to see if at top of list
              scope.selectedIndex--;
            }
          } else if (event.keyCode === 13) { //enter pressed
            event.preventDefault();
            // test if user pressing enter without selecting with arrow keys first and value already added
            if (scope.selectedTags.indexOf(scope.searchText) > -1 && scope.selectedIndex <= -1) return;
            scope.addToSelectedTags(scope.selectedIndex); //adds to selected tags
          }
        }

        // Everytime we type something, we filter the tags to shorten the list since list might get VERY long
        scope.filterTags = function() {
          scope.selectedIndex = -1; // Reset to -1 so nothing is selected on change TODO: try to find out how to get closest match
          scope.filteredSuggestedTags = $filter('fuzzySearch')(scope.suggestedTags, scope.searchText, 'OR');
        }

        scope.addToSelectedTags = function (index) {
          // At this point, users who have tried to add a freeform tag (not select a tag) that's already in newTags should be filtered out
          // Test to see if selectedTags already has this value
          if(scope.selectedTags.indexOf(scope.filteredSuggestedTags[index]) > -1) return;
          // Test to see if user used arrow keys to select tag, if false then we use searchText instead of index
          // Also tests if suggestions are in filteredSuggestedTags; even though it's technically a new tag add, we put it to the next conditional block for color formatting
          if(index < 0 && scope.filteredSuggestedTags.indexOf(scope.searchText) <= -1){
            // Freeform adding situation
            // Test cases:
            //   - New tag, no selection made in suggestedTags
            //   - New tag, doesn't already exist
            scope.selectedTags.push(scope.searchText);
            scope.unknownTags.push(scope.searchText);
          }
          else if (index < 0 && scope.filteredSuggestedTags.indexOf(scope.searchText) >= -1){
            // Test cases:
            //   - New tag, tag exists in DB, but not selected from filteredSuggestedTags
            scope.selectedTags.push(scope.searchText);
            scope.newTags.push(scope.searchText);
          }
          else{
            // Test cases:
            //   - New tag, exists in DB, 
            scope.selectedTags.push(scope.filteredSuggestedTags[index]);
            scope.newTags.push(scope.filteredSuggestedTags[index]);
          }
          scope.selectedTags = _.sortBy(scope.selectedTags); // Re-order the tags so we can find alphabetically
          scope.searchText = ''; // Clear search text
        };
        scope.removeFromSelectedTags = function (tag) {
          _.pull(scope.selectedTags, tag); // we use pull to remove all instances of the same tag
          _.pull(scope.unknownTags, tag); // we use pull to remove all instances of the same tag
          _.pull(scope.newTags, tag); // we use pull to remove all instances of the same tag
        };
      }
    };
  });
