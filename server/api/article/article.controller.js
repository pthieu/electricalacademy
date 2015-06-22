'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of articles
exports.index = function(req, res) {
  Article.find({}, null, {sort: {_created: -1}}).populate('author', 'name _id').exec(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// TODO: remove? currently not used, do we need this?
// Get a single article
exports.show = function(req, res) {
  Article.findOne({'stub': req.params.stub}, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Get a single article by stub
exports.articleByStub = function(req, res) {
  var date = {
    year: req.params.year,
    month: req.params.month,
    day: req.params.day
  }
  var stub = req.params.stub;

  date.start = new Date(date.year, date.month, date.day);
  date.end = new Date(date.year, date.month, date.day+1);

  // Look in date range + stub so we can guarantee no duplicates if we accidentally name an article the same thing in the future
  Article.findOne({'_created':{'$gte': date.start, '$lt': date.end}, 'stub': req.params.stub}, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Get single article by id
exports.articleById = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

exports.getAllCategories = function(req, res) {
  Article.distinct('category', function (err, categories) {
    if(err) { return handleError(res, err); }
    // we check length >= 0 because at the initial deploy, we might not have categories
    if(!categories && categories.length >= 0) { return res.send(404); }
    return res.json(_.sortBy(categories)); // sorts by alphabetical, we can add a callback function to determine other ways to manipulate order i.e. return -val for DESC
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  // var article_stub = req.body.title.replace(/[^a-zA-Z -]+/g,'').replace(/[- ]+/g,'-'); // Greedy match all non-alphabetical characters, and then replace whitespace(1 or more) with dashes
  // if (article_stub.split(' ').length > 8){ // If array longer than 8 words, truncate
  //   article_stub = _.take(article_stub.split(' '), 8).join('-');
  // }
  // Delete category so db defaults trigger but only if user didn't select any categories in front end
  if(typeof req.body.category !== 'undefined' && req.body.category instanceof Array && req.body.category.length <= 0){
    delete req.body.category
    req.body.category = [1]; // Explicitly set to General category if array is empty, don't know why db defaults aren't working now
  }
  
  var article_options = _.merge({'author':req.user._id}, req.body) // article.stub model changed to not required
  var article = new Article(article_options);
  article.save(function(err, article) {
    if(err) { return handleError(res, err); }
    return res.json(201, article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }

    article.last_updated = new Date(); // If editing existing article, update last_updated time
    article.category.length = 0; // We delete category field because merge will fuck it up

    var updated = _.merge(article, req.body);
    updated.markModified('category'); // have to mark array modified because array kinda more complex

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}