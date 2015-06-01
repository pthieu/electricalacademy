'use strict';

angular.module('portfolioApp')
  .controller('ArticleDashboardCtrl', function($scope, $http) {
    // Grab the initial set of available articles
    $http.get('/api/articles').success(function(articles) {
      $scope.articles = articles;
 
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
