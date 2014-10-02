'use strict';
var config = require('../config.js'),
    fs = require('fs'),
    glob = require('glob'),
    logger = require('./logger.js'),
    Post = require('./post.js'),
    Readable = require('stream').Readable,
    wmd = require('ragesh-wmd');

function Generator() {
  var self = this;
  var postStream = new Readable({ objectMode: true });
  var globMatches = [];
  var globMatchIndex = 0;

  postStream._read = function() {
    if (globMatchIndex >= globMatches.length) {
      logger.debug('All posts done. Closing post stream');
      return postStream.push(null);
    }
    var fileName = globMatches[globMatchIndex++];
    logger.debug({ fileName: fileName }, 'Processing post file');
    try {
      fs.readFile(fileName, 'utf8', function(err, postContent) {
        if (err) {
          return postStream.emit('error', err);
        }
        var doc = wmd(postContent);
        var post = new Post(doc);
        postStream.push(post);
      });
    } catch (e) {
      postStream.emit('error', e);
    }
  };


  self.generatePosts = function () {
    globMatches = glob.sync(config.postsGlobPattern, null);
    return postStream;
  };
}

module.exports = function(callback) {
  return new Generator().generatePosts(callback);
};
