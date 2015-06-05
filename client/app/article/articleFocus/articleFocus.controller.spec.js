'use strict';

describe('Controller: ArticleFocusCtrl', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var ArticleFocusCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleFocusCtrl = $controller('ArticleFocusCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
