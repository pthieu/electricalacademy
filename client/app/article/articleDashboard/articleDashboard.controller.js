'use strict';

angular.module('portfolioApp')
  .controller('ArticleDashboardCtrl', function($scope, $http) {
    // Grab the initial set of available articles
    $http.get('/api/articles').success(function(articles) {
      $scope.articles = articles;

      $scope.articleTruncate = function (_content) {
        // return _.chain(_content.split('')).take(2);
        var trunc_length = 200 //
        return _content.substring(0,trunc_length).concat((_content.length > trunc_length+1)?'...':''); // Take only 100 characters and then add ellipses
      };
 
      // Update array with any new or deleted items pushed from the socket
      // socket.syncUpdates('article', $scope.articles, function(event, article, articles) {
      //   // This callback is fired after the articles array is updated by the socket listeners
 
      //   // // sort the array every time its modified
      //   // articles.sort(function(a, b) {
      //   //   a = new Date(a._created);
      //   //   b = new Date(b._created);
      //   //   return a>b ? -1 : a<b ? 1 : 0;
      //   // });
      // });
    });
  });
