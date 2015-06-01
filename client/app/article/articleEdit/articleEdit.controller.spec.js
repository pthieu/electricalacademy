'use strict';

describe('Controller: ArticleEditCtrl', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var ArticleEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleEditCtrl = $controller('ArticleEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
