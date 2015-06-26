'use strict';

describe('Controller: ArticleDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));

  var ArticleDashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleDashboardCtrl = $controller('ArticleDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
