'use strict';
var logger = require('./logger.js'),
    fs = require('fs'),
    glob = require('glob'),
    Post = require('./post.js'),
    wmd = require('ragesh-wmd'),
    config = require('../config.js'),
    _ = require('underscore');


function Generator() {
  var self = this;
  self.errors = [];
  self.posts = [];

  self.generateHtml = function(callback) {
    glob(config.postsGlobPattern, null, processPostFiles);
  };

  function processPostFiles(err, matches) {
    logger.debug('Matching posts', matches);
    matches.forEach(processPostFile);
  }

  function processPostFile(postFileName) {
    logger.debug('Processing', postFileName);
    fs.readFile(postFileName, 'utf8', processPostContent);
  }

  function processPostContent(err, postContent) {
    if (err) {
      return self.errors.push(err);
    }
    var doc = wmd(postContent);
    logger.debug({ wmd: doc }, 'WMD parsed');
    var post = new Post(doc);
    logger.debug({ post: post }, 'Generated post');
  }
}

module.exports = Generator;
