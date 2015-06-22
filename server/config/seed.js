/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Article = require('../api/article/article.model');
var Q = require('q');

Q.fcall(function() {
    var deferred = Q.defer();
    User.find({}).remove(function() {
      User.create({
        provider: 'local',
        name: 'Phong Thieu',
        email: 'pthieu@gmail.com',
        password: 'poopoo'
      }, function() {
        deferred.resolve();
        console.log('finished populating users');
      });
    });
    return deferred.promise;
  })
  .then(function() {
    console.log('Finding just-seeded user');
    return Q.ninvoke(User, 'findOne');
  })
  .then(function(user) {
    var deferred = Q.defer();
    var user_id = user._id;
    Article.find({}).remove(function() {
    debugger;
      Article.create({
        stub: 'stub 1',
        image: 'http://dummyimage.com/1280x480/666666/ffffff.png&text=test 1',
        title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
        content: '**test content 1**',
        site: 1,
        type: 1,
        category: ['general'],
        author: user_id
      }, {
        stub: 'stub 2',
        image: 'http://dummyimage.com/1280x480/ff0000/ffffff.png&text=test 1',
        title: 'Lorem Ipsum is simply dummy tex',
        content: '**test content 2**',
        site: 1,
        type: 1,
        category: ['general', 'amazon'],
        author: user_id
      }, {
        stub: 'stub 3',
        image: 'http://dummyimage.com/1280x480/00ff00/ffffff.png&text=test 1',
        title: 'Lorem Ipsum is simply dummy te',
        content: '**test content 3**',
        site: 1,
        type: 2,
        category: ['general', 'doggies'],
        author: user_id
      }, {
        stub: 'Why-Become-Multidisciplinary-In-The-Workforce',
        image: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/Wenger_EvoGrip_S17.JPG',
        title: 'Why Become Multidisciplinary In The Workforce?',
        content: '_The same reason you should focus and perfect a single discipline._\n\nThe question is really quite subjective; I believe the more important question is: _"what is required of you right now and where will your multi-faceted skillset be needed most?"_.\n\nWe need both these types of workers, together creating a balanced workforce; the ones who perform a single function and do it amazingly well, and the ones who can put on different hats and, although will never reach the peak-performance of the single-disciplined person, can do a damn good job as well, not to mention pull a clutch play when needed.\n\nThe important part about being multidisciplinary, is that you really need to keep an eye out on when that\'s needed. If your company is a large corporation, you\'re probably not going to be able to utilize your full potential. Not to say it\'s impossible, but you\'re generally going to have to become a single cog in the machine, never utilizing your pull potential. \n\nWhat you\'d need to do is find a smaller company where you can be agile, and move where you\'re needed, to be able to give an opinion from a world where your complementing skills come from, to be able to combine your experiences and view the world at angles uncommonly perceived. The good thing about being multidisciplinary is that you\'ll begin to notice gaps between your disciplines that few can fill, and to build these bridges to allow others to get across is how you\'ll be able to improve yourself and how we will advance as a race, together.',
        site: 1,
        type: 1,
        category: ['general', 'test3'],
        author: user_id
      }, function() {
        deferred.resolve();
        console.log('finished populating Articles');
      });
    });
    return deferred.promise;
  });



// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });
