'use strict';

angular.module('portfolioApp')
  .controller('NavbarCtrl', function($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    // }, {
    //   'title': 'Tutorials',
      // 'link': '/tutorial'
    // }, {
    //   'title': 'Articles',
    //   'link': '/article'
    }, {
      'title': 'Resume',
      'link': '/resume'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = function () {
      var user = Auth.getCurrentUser();
      user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
      return user;
    };


    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      route = (route.length === 1)?'^'+route+'$':route; // check to see for special case of home's '/'
      var rgx = new RegExp(route,'i')
      return ((!!$location.path().match(rgx))?$location.path().match(rgx).length > 0:null);
    };
  });
