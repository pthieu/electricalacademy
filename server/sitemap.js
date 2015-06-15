/**
 * Grabs DB information and creates sitemap.xml
 */

'use strict';

var errors = require('./components/errors');
var sm = require('sitemap');

// required
var Article = require('./api/article/article.model');

module.exports = function(app) {
  var sitemap = sm.createSitemap ({
      hostname: 'http://example.com',
      cacheTime: 600000,        // 600 sec - cache purge period 
      urls: [
        { url: '/page-1/',  changefreq: 'daily', priority: 0.3 },
      ]
    });

  app.route('/sitemap.xml')
    .get(function(req, res) {
      sitemap.toXML( function (xml) {
        res.header('Content-Type', 'application/xml');
          res.send( xml );
        });
      });
};
