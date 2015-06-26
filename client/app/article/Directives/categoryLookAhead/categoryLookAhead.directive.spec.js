'use strict';

describe('Directive: categoryLookAhead', function () {

  // load the directive's module and view
  beforeEach(module('electricalacademyApp'));
  beforeEach(module('app/article/Directives/categoryLookAhead/categoryLookAhead.html'));

  var $httpBackend,
      element,
      scope;

  beforeEach(inject(function (_$httpBackend_, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('app/main/main.html').respond(200, '');

    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<category-look-ahead></category-look-ahead>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).not.toBe(null);
  }));
});