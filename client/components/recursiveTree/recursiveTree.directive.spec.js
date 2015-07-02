'use strict';

describe('Directive: recursiveTree', function () {

  // load the directive's module and view
  beforeEach(module('electricalacademyApp'));
  beforeEach(module('components/recursiveTree/recursiveTree.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recursive-tree></recursive-tree>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the recursiveTree directive');
  }));
});