'use strict';

describe('Directive: categoryLookAhead', function () {

  // load the directive's module and view
  beforeEach(module('portfolioApp'));
  beforeEach(module('app/article/Directives/categoryLookAhead/categoryLookAhead.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<category-look-ahead></category-look-ahead>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the categoryLookAhead directive');
  }));
});