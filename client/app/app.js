'use strict';

angular.module('electricalacademyApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'angular-markdown',
    'angular.filter',
    'ui.tree'
  ])
  .constant('treeConfig', {
    treeClass: 'angular-ui-tree',
    emptyTreeClass: 'angular-ui-tree-empty',
    hiddenClass: 'angular-ui-tree-hidden',
    nodesClass: 'angular-ui-tree-nodes',
    nodeClass: 'angular-ui-tree-node',
    handleClass: 'angular-ui-tree-handle',
    placeholderClass: 'angular-ui-tree-placeholder',
    dragClass: 'angular-ui-tree-drag',
    dragThreshold: 5,
    levelThreshold: 30
  })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function($rootScope, $location, Auth, $timeout, $state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
    $rootScope.$on("$stateChangeSuccess", function() {
      var meta = {
        'list': ['$title', '$description'],
        'items': {}
      }

      meta.list.forEach(function (item) {
        meta.items[item] = getMetaValue($state.$current.locals.globals[item]);
        if (meta.items[item]) {
          $timeout(function() {
            $rootScope[item] = meta.items[item];
          });
        }
      });

      $rootScope.$breadcrumbs = [];
      var state = $state.$current;
      while (state) {
        var unshiftItems = {};
        var needUnshift = false;
        meta.list.forEach(function (item) {
          if (state.resolve && state.resolve[item]) {
            unshiftItems[item.replace(/\$/, '')] = getMetaValue(state.locals.globals[item])
            needUnshift = true;
          }    
        });
        if (needUnshift) {
          $rootScope.$breadcrumbs.unshift(unshiftItems);
          $rootScope.$breadcrumbs.unshift({
            state: state.self.name,
            stateParams: state.locals.globals.$stateParams
          });
        }
        state = state.parent;
      }
    });

    function getMetaValue(item) {
      return angular.isFunction(item) ? item() : item;
    }
  });
