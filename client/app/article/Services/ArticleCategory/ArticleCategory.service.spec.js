'use strict';

describe('Service: ArticleCategory', function () {

  // load the service's module
  beforeEach(module('portfolioApp'));

  // instantiate service
  var ArticleCategory;
  beforeEach(inject(function (_ArticleCategory_) {
    ArticleCategory = _ArticleCategory_;
  }));

  it('should do something', function () {
    expect(!!ArticleCategory).toBe(true);
  });

});
