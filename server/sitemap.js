/**
 * Grabs DB information and creates sitemap.xml
 */

'use strict';

var Q = require("q");
var errors = require('./components/errors');
var sm = require('sitemap');
var _ = require('lodash');
var config = require('./config/environment');

// required
var Article = require('./api/article/article.model');

module.exports = function(app) {
  var articleURLs = [];

  // sitemap object with hardcoded URLs
  var sitemap = sm.createSitemap({
    hostname: (config.env === 'production') ? 'http://'+config.hostname : 'http://localhost:'+config.port,
    cacheTime: 600000, // 600 sec - cache purge period 
    urls: [{
      url: '', // http://electricalacademy.com
      changefreq: 'daily',
      priority: 1
    }, {
      url: '/', // http://electricalacademy.com + '/'
      changefreq: 'daily',
      priority: 1
    }, {
      url: '/resume',
      changefreq: 'monthly',
      priority: 0.9
    }]
  });

  // Create a promise that gets triggered after multiple mongoose calls completed.
  Q.all([
      Article.find({}).exec()
    ])
    .spread(function(articleResult) {
      // iterate through results and push to URLS accordingly
      articleResult.forEach(function(article) {
        var t = new Date(article._created);
        var articleDate = {
          year: t.getUTCFullYear(),
          month: t.getUTCMonth(),
          day: t.getUTCDay()
        };

        // manually create date section for the url to articleFocus
        // the "''" in the first and last index is to apply an additional '/' for the url
        articleDate.url = ['', articleDate.year, articleDate.month, articleDate.day, ''].join('/');

        articleURLs.push({
          url: '/article' + articleDate.url + article.stub,
          changefreq: 'monthly',
          priority: 0.5
        });
      });
      // Use reduce to append result array into sitemap.urls array for performance
      sitemap.urls = articleURLs.reduce(function(coll, item) {
        coll.push(item);
        return coll;
      }, sitemap.urls);
    });

  app.route('/sitemap.xml')
    .get(function(req, res) {
      sitemap.toXML(function(xml) {
        res.header('Content-Type', 'application/xml');
        res.send(xml);
      });
    });
};