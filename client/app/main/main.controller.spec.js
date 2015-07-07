'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      element,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $http) {
    scope = $rootScope.$new();
    
    $httpBackend = _$httpBackend_;
    // Common response, will probably need this for all directives in main.html
    $httpBackend.whenGET('app/main/main.html').respond(200, '');

    // when the backend receives a GET call for '/api/articles', respond with array of random stuff
    // TODO: probably don't need this because we changed main.html
    // $httpBackend.whenGET('/api/articles')
    //   .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $http: $http
    });
  }));

  it('should attach a list of things to the scope', inject(function ($compile) {
    $httpBackend.flush();
    // expect(typeof scope.articles).toBe('object');
  }));
});
