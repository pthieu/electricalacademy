'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of articles
exports.index = function(req, res) {
  Article.find(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  debugger;
  Article.findOne({'stub': req.params.stub}, function (err, article) {
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
  
  var article_options = _.merge({'stub': 'placeholder'}, req.body) // placeholder for stub
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
    var updated = _.merge(article, req.body);
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