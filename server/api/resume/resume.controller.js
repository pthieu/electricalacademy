'use strict';

var _ = require('lodash');
var Resume = require('./resume.model');

// Get list of resumes
exports.index = function(req, res) {
  Resume.find(function (err, resumes) {
    if(err) { return handleError(res, err); }
    return res.json(200, resumes);
  });
};

exports.list = function(req, res) {
  Resume.find().sort('-created').populate('user', 'displayName').exec(function(err, resume) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var jobs = [{
          'title': 'CRM Application Developer',
          'company': {
            'name': 'Klick Health',
            'logo': 'klick-logo.png'
          },
          'startdate': '2015-03-07',
          'enddate': 'present',
          'location': 'Toronto, Ontario',
          'description': [
            'Design of database architecture focusing on client relations stressing extensibility and performance.',
            'Big data analytics, finding value in the data mined for clients and providing easily-readable reports.',
            'Development of cross-platform web services that interfaces with multiple client callcenters and forms.',
            'Development of CRM platform focusing quick setup and scalability so client onboarding is less stressful and quicker, allowing rapid client acquisition.',
            '.NET MVC, KnockoutJS.'
          ]
        },{
          'title': 'Full Stack Developer',
          'company': {
            'name': 'Klick Health',
            'logo': 'klick-logo.png'
          },
          'startdate': '2014-04-07',
          'enddate': '2015-03-07',
          'location': 'Toronto, Ontario',
          'description': [
            'End-to-end development of software systems from architecture and design through development to deployments and maintenance.',
            'Provide input to the technology leadership, project management and account teams to define deliverables and timelines.',
            'Use of BDD to minimize issues going to QA and production.',
            'Implementation of MVC architecture and responsive design into solutions, supporting browsers as old as IE6.',
            'Experiment with and evaluate new technologies, i.e. RoR, NodeJS, AngularJS, D3js.',
            'Cross-platform development for email campaigns via Marketo and Silverpop.'
          ]
        },{
          'title': 'ASIC Design Verification Engineer',
          'company': {
            'name': 'Qualcomm Inc.',
            'logo': 'qc-logo.png'
          },
          'startdate': '2012-04-04',
          'enddate': '2014-04-01',
          'location': 'Markham, Ontario',
          'description': [
            'Verification of hardware logic via RTL (Verilog/SystemVerilog) assertions.',
            'Modification of hardware logic based on verification results.',
            'Design and implement testbenches using a combination of DPI\'s (Verilog/C) and C++ wrappers.',
            'Black/white-box test design for sub-block/IP logic, reaching 100% functional/code coverage.',
            'Plan coverage points based on architecture design for each milestone of project.',
            'Automate test generation and test-flow control through scripting via perl/csh/makefiles.',
            'Debugging of existing IP issues via debugger (DDD) and waveform analysis (Verdi/DVE).'
          ]
      }];
      res.jsonp(jobs);
    }
  });
};

// Get a single resume
exports.show = function(req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    return res.json(resume);
  });
};

// Creates a new resume in the DB.
exports.create = function(req, res) {
  Resume.create(req.body, function(err, resume) {
    if(err) { return handleError(res, err); }
    return res.json(201, resume);
  });
};

// Updates an existing resume in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Resume.findById(req.params.id, function (err, resume) {
    if (err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    var updated = _.merge(resume, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, resume);
    });
  });
};

// Deletes a resume from the DB.
exports.destroy = function(req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    resume.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}