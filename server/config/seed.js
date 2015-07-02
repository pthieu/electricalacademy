/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Article = require('../api/article/article.model');
var Lesson = require('../api/lesson/lesson.model');
var LessonList = require('../api/lessonList/lessonList.model');
var Q = require('q');

LessonList.find({}).remove(function() {
  LessonList.create({
    list: [{
      'title': 'Fundamentals',
      'order': 1,
      'lessonRef': 'fundamentals',
      'children': [{
        'title': 'Electricity',
        'order': 2,
        'lessonRef': 'electricity',
        'children': [],
      }, {
        'title': 'History',
        'order': 1,
        'lessonRef': 'history',
        'children': [],
      }, {
        'title': 'Voltage, current, and resistance',
        'order': 3,
        'lessonRef': 'voltage-current-resistance',
        'children': [],
      }]
    },{
      'title': 'Basics',
      'order': 2,
      'lessonRef': 'basics',
      'children': []
    }]
  });
});

Q.fcall(function() {
    var deferred = Q.defer();
    Lesson.find({}).remove(function() {
      var id = mongoose.Types.ObjectId();
      var rootNodes = [{
        'title': 'Fundamentals',
        'stub': 'fundamentals',
        'content': '**Fundamentals** _content_'
      }, {
        'title': 'Basics',
        'stub': 'basics',
        'content': '**Basics** _content_'
      }, {
        'title': 'Electricity',
        'stub': 'electricity',
        'content': '**Electricity** _content_'
      }, {
        'title': 'History',
        'stub': 'history',
        'content': '**History** _content_'
      }];

      var parentNodes = _.map(rootNodes, function(node) {
        return {
          '_id': node._id,
          'stub': node.stub
        }
      }); // grab all newly created IDs

      Lesson.create(rootNodes, function() {
        deferred.resolve(parentNodes);
        console.log('finished populating root level lessons');
      });
    });
    return deferred.promise;
  })
  // .then(function(parentNodes) {
  //   parentNodes.forEach(function(parent) {
  //     Q.fcall(function() {
  //         var deferred = Q.defer();
  //         switch (parent.stub.toLowerCase()) {
  //           case 'fundamentals':
  //             var children = [{
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'History',
  //               'stub': 'history',
  //               'content': '**History** _content_',
  //               'parent': parent._id
  //             }, {
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'Electricity & electron flow',
  //               'stub': 'electricity',
  //               'content': '**Electricity & electron flow** _content_',
  //               'parent': parent._id
  //             }];
  //             break;
  //           case 'basics':
  //             var children = [{
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'basics child 1',
  //               'stub': 'basics child 1',
  //               'content': '**basics child** _content_',
  //               'parent': parent._id
  //             }, {
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'basics child 2',
  //               'stub': 'basics child 2',
  //               'content': 'basics child 2',
  //               'parent': parent._id
  //             }];
  //             break;
  //           case 'bjts':
  //             var children = [{
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'bjts child 1',
  //               'stub': 'bjts child 1',
  //               'content': '**bjts child** _content_',
  //               'parent': parent._id
  //             }, {
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'bjts child 2',
  //               'stub': 'bjts child 2',
  //               'content': 'bjts child 2',
  //               'parent': parent._id
  //             }];
  //             break;
  //           case 'mosfets':
  //             var children = [{
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'mosfets child 1',
  //               'stub': 'mosfets child 1',
  //               'content': '**mosfets child** _content_',
  //               'parent': parent._id
  //             }, {
  //               '_id': mongoose.Types.ObjectId(),
  //               'title': 'mosfets child 2',
  //               'stub': 'mosfets child 2',
  //               'content': 'mosfets child 2',
  //               'parent': parent._id
  //             }];
  //             break;
  //         }

  //         var childrenIDs = _.pluck(children, '_id'); // grab all newly created IDs

  //         Lesson.create(children, function() {
  //           deferred.resolve({
  //             'parent': parent._id,
  //             'children': childrenIDs // should return two each
  //           });
  //         });
  //         return deferred.promise;
  //       })
  //       .then(function(IDs) {
  //         Lesson.findOne({
  //           '_id': IDs.parent
  //         }).exec(function(err, lesson) {
  //           lesson.children = IDs.children;
  //           lesson.save();

  //           // Children IDs become new parents
  //           IDs.children.forEach(function(parent) {
  //             Q.fcall(function() {
  //                 var deferred = Q.defer();
  //                 var child = {
  //                   '_id': mongoose.Types.ObjectId(),
  //                   'title': lesson.title + ' child',
  //                   'stub': parent,
  //                   'content': 'test',
  //                   'parent': parent
  //                 }

  //                 var childID = child._id;
  //                 Lesson.create(child, function() {
  //                   deferred.resolve({
  //                     'parent': parent,
  //                     'children': childID
  //                   })
  //                 })
  //                 return deferred.promise;
  //               })
  //               .then(function(IDs) {
  //                 Lesson.findOne({
  //                   '_id': IDs.parent
  //                 }).exec(function(err, lesson) {
  //                   lesson.children = IDs.children;
  //                   lesson.save();
  //                 });
  //               });
  //           });
  //         });
  //       });
  //   });
  // });

Q.fcall(function() {
    var deferred = Q.defer();
    User.find({}).remove(function() {
      User.create({
        provider: 'local',
        firstname: 'Phong',
        lastname: 'Thieu',
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
      Article.create({
        image: 'http://dummyimage.com/1280x480/666666/ffffff.png&text=test 1',
        title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
        content: '**test content 1**',
        site: 1,
        type: 1,
        category: ['general'],
        author: user_id
      }, {
        image: 'http://dummyimage.com/1280x480/ff0000/ffffff.png&text=test 1',
        title: 'Lorem Ipsum is simply dummy tex',
        content: '**test content 2**',
        site: 1,
        type: 1,
        category: ['general', 'amazon'],
        author: user_id
      }, {
        image: 'http://dummyimage.com/1280x480/00ff00/ffffff.png&text=test 1',
        title: 'Lorem Ipsum is simply dummy te',
        content: '**test content 3**',
        site: 1,
        type: 2,
        category: ['general', 'doggies'],
        author: user_id
      }, {
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
