'use strict';

describe('Filter: fuzzySearch', function () {

  // load the filter's module
  beforeEach(module('portfolioApp'));

  // initialize a new instance of the filter before each test
  var fuzzySearch;
  beforeEach(inject(function ($filter) {
    fuzzySearch = $filter('fuzzySearch');
  }));

  it('should return the inputArray with matched word', function () {
    var inputArray = [
      'aaa bbb ccc ddd eee',
      'aaa bbb ccc ddd',
      'aaa bbb ccc',
      'aaa bbb',
      'aaa'
    ];
    var searchType = 'OR';

    var searchText = 'eee';
    expect(fuzzySearch(inputArray, searchText, searchType).length).toBe(1);
  });
});
