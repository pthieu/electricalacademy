'use strict';

describe('Directive: recursiveTree', function () {

  // load the directive's module and view
  beforeEach(module('electricalacademyApp'));
  beforeEach(module('components/recursiveTree/recursiveTree.html'));

  var $httpBackend,
      element,
      scope;

  beforeEach(inject(function (_$httpBackend_, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('app/main/main.html').respond(200, '');

    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recursive-tree></recursive-tree>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toMatch(/ui-sref=".focus/);
  }));
});