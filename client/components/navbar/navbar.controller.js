'use strict';

angular.module('electricalacademyApp')
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
    // }, {
    }, {
      'title': 'Lessons',
      'link': '/lesson'
    }
    // ,{
    //   'title': 'Resume',
    //   'link': '/resume'
    // }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = function () {
      var user = Auth.getCurrentUser();
      if (typeof user !== 'undefined' && !!user.firstname){
        user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
        return user;
      }
      else {
        return null;
      }
    };


    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      if (!route) return; // check for empty route
      route = (route.length === 1)?'^'+route+'$':route; // check to see for special case of home's '/'
      var rgx = new RegExp(route,'i')
      return ((!!$location.path().match(rgx))?$location.path().match(rgx).length > 0:null);
    };
  });
