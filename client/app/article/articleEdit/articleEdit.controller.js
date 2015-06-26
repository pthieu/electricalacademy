'use strict';

angular.module('electricalAcademyApp')
  .controller('ArticleEditCtrl', function (ArticleCategoryService, $http, $stateParams, $location, $interval, $scope) {
    $scope.options = {
      site: [
        {'value': 1, 'text': 'All'},
        {'value': 2, 'text': 'phongt.com'},
        {'value': 3, 'text': 'electricalacademy.com'}
      ],
      type: [
        {'value': 1, 'text': 'Article'},
        {'value': 2, 'text': 'Tutorial'},
        {'value': 3, 'text': 'Lesson'},
        {'value': 4, 'text': 'Comic'}
      ],
      // category: [
      //   {'value': 1, 'text': 'General'},
      //   {'value': 2, 'text': 'Hardware'},
      //   {'value': 3, 'text': 'Software'},
      //   {'value': 4, 'text': 'Technology'},
      //   {'value': 5, 'text': 'Entrepreneur'},
      //   {'value': 6, 'text': 'Motivation'},
      // ]
    };

    $scope.errors = {}; // initialize errors

    // Calls the getCategories function from the ArticleCategory Service,
    // Will return a promise
    ArticleCategoryService.getCategories()
      .then(function (categories) { // try
        $scope.options.category = categories
      }, function (err) { // catch
        console.log(err);
      }); // can add a third callback for 'throw' portion of try-catch-throw

    // Either we're editing an existing article or creating a new one, we can figure this out from params in url
    $scope.articleID = (typeof $stateParams.article_id === 'undefined' || $stateParams.article_id === '') ? null : $stateParams.article_id;
    $scope.articleExists = false; // Initialize article flag to either call a post or put later

    // If articleID exists from URL bar, we call web services to grab info and populate
    if(!!$scope.articleID){
      $http.get('/api/articles/articleById/'+$scope.articleID).success(function(article) {
        // If article is found, we the form with the existing article for edit
        $scope.articleSite = $scope.options.site[article.site-1]; // DB index starts at 0, front end array starts at 0
        $scope.articleType = $scope.options.type[article.type-1]; // DB index starts at 0, front end array starts at 0
        $scope.articleCategory = article.category;
        $scope.articleTitle = article.title;
        $scope.articleImage = article.image;
        $scope.articleContent = article.content;
        $scope.articleExists = true; // article exists, so set flag so we can put instead of post
      }).error( function (data, status, headers, config) {
        $scope.articleExists = false;
      });
    }
    // Either we have existing articleID and it's real, which will change below values later, or we don't and we need to use defaults
    // Or the third case is that articleID exists but it's not in DB, so the $http.get will be a fail, so we'll have to use defaults so below is outside $http.get block for this reason
    $scope.articleSite = $scope.options.site[0];
    $scope.articleType = $scope.options.type[0];
    $scope.articleCategory = ['general'];

    // Handles the selection of categories so we can POST to server as a simple arrayx
    $scope.toggleCategory = function (category_val) {
      var index = $scope.articleCategory.indexOf(category_val);

      // is currently selected
      if (index > -1) {
        $scope.articleCategory.splice(index, 1);
      }
      // is newly selected
      else {
        $scope.articleCategory.push(category_val);
      }

      $scope.articleCategory.sort(); // Sort for easier debugging later
    };

  	$scope.createArticle = function ($event) {
  		$event.stopPropagation();

      var req = {
        method: ($scope.articleExists)?'PUT':'POST', // Either a create new or an update, the routes are differentiated so server knows
        url: ($scope.articleExists)?'/api/articles/'+$scope.articleID:'/api/articles', // same as above
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          title: $scope.articleTitle,
          image: $scope.articleImage,
          content: $scope.articleContent,
          site: $scope.articleSite.value, // Note that this is an object so we'll have to explicitly refer to .value because server expecting it, otherwise validation error will pop
          type: $scope.articleType.value, // Note that this is an object so we'll have to explicitly refer to .value because server expecting it, otherwise validation error will pop
          category: $scope.articleCategory
        }
      }

      $http(req).success(function(article, status, headers, config){
        $scope.redirect = true;
        $location.path('article/dashboard'); // Redirect to dashboard if success
      }).error(function(data, status, headers, config){
        $scope.errors.other = data.err;
      });

      //POST to server to create new content
      // $http.post('/api/articles', );
      // Reset view
      // $scope.articleTitle = '' // Clear input
      // $scope.articleContent = '' // Clear input

  	};

    // If user leaves, ask if sure, NOTE: this requires $location service
    // TODO: finish unsaved changes detection
    // $scope.$on('$locationChangeStart', function(event) {
    //   if ($scope.redirect) {return}; // Already saved so we don't need to confirm
    //   var answer = confirm("Are you sure you want to leave this page?")
    //   if (!answer) {
    //     event.preventDefault();
    //   }
    // });
  });