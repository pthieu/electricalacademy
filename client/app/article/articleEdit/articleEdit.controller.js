'use strict';

angular.module('portfolioApp')
  .controller('ArticleEditCtrl', function ($scope, $http) {
    $scope.options = {
      site: [
        {'value': 1, 'text': 'All'},
        {'value': 2, 'text': 'phongt.com'},
        {'value': 3, 'text': 'electricalacademy.com'}
      ],
      type: [
        {'value': 1, 'text': 'Article'},
        {'value': 2, 'text': 'Tutorial'},
        {'value': 3, 'text': 'Lesson'},
        {'value': 4, 'text': 'Comic'}
      ],
      category: [
        {'value': 1, 'text': 'General'},
        {'value': 2, 'text': 'Hardware'},
        {'value': 3, 'text': 'Software'},
        {'value': 4, 'text': 'Technology'},
        {'value': 5, 'text': 'Entrepreneur'},
        {'value': 6, 'text': 'Motivation'},
      ]
    };
    $scope.articleSite = $scope.options.site[0];
    $scope.articleType = $scope.options.type[0];
    $scope.articleCategory = [1];

    // Handles the selection of categories so we can POST to server as a simple arrayx
    $scope.toggleCategory = function (category_val) {
      var index = $scope.articleCategory.indexOf(category_val);

      // is currently selected
      if (index > -1) {
        $scope.articleCategory.splice(index, 1);
      }
      // is newly selected
      else {
        $scope.articleCategory.push(category_val);
      }

      $scope.articleCategory.sort(); // Sort for easier debugging later
    };

  	$scope.createArticle = function ($event) {
  		$event.stopPropagation();

      //POST to server to create new content
      $http.post('/api/articles', {
        title: $scope.articleTitle,
        content: $scope.articleContent,
        site: $scope.articleSite.value, // Note that this is an object so we'll have to explicitly refer to .value because server expecting it, otherwise validation error will pop
        type: $scope.articleType.value, // Note that this is an object so we'll have to explicitly refer to .value because server expecting it, otherwise validation error will pop
        category: $scope.articleCategory
      });
      // Reset view
      // $scope.articleTitle = '' // Clear input
      // $scope.articleContent = '' // Clear input

  	};

    // If user leaves, ask if sure
    $scope.$on('$locationChangeStart', function(event) {
      debugger;
      var answer = confirm("Are you sure you want to leave this page?")
      if (!answer) {
        event.preventDefault();
      }
    });
  });