'use strict';

angular.module('portfolioApp')
  .factory('ArticleCategoryService', function ($http, $q) {
    // Service logic
    // ...

    var categories = [];

    var _getCategories = $http.get('/api/articles/category').error(function (data, status, headers, config) {}).then(function (_categories) {
      categories = _categories.data;
      return categories;
    });
    // .error( function (data, status, headers, config) {
    // });

    // Public API here
    return {
      getCategories: function () {
        var deferred = $q.defer();
        if (categories.length > 0) {
            deferred.resolve(categories);
        } else {
            // deferred.resolve(_getCategories);
            return _getCategories; //$http already returns a promise so we don't need to care about this
        }
        return deferred.promise;
      }
    };
  });