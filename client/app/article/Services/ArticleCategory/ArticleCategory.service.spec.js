'use strict';

describe('Service: ArticleCategory', function () {

  // load the service's module
  beforeEach(module('electricalacademyApp'));

  // instantiate service
  var ArticleCategory;
  beforeEach(inject(function (_ArticleCategoryService_) {
    ArticleCategory = _ArticleCategoryService_;
  }));

  it('should do something', function () {
    expect(!!ArticleCategory).toBe(true);
  });

});
