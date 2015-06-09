'use strict';

describe('Filter: fuzzySearch', function () {

  // load the filter's module
  beforeEach(module('portfolioApp'));

  // initialize a new instance of the filter before each test
  var fuzzySearch;
  beforeEach(inject(function ($filter) {
    fuzzySearch = $filter('fuzzySearch');
  }));

  it('should return the input prefixed with "fuzzySearch filter:"', function () {
    var text = 'angularjs';
    expect(fuzzySearch(text)).toBe('fuzzySearch filter: ' + text);
  });

});
