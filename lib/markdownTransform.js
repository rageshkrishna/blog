'use strict';
var fs = require('fs'),
    rootLogger = require('./logger.js'),
    Post = require('./post.js'),
    Transform = require('stream').Transform,
    wmd = require('ragesh-wmd'),
    cache = require('./cache.js');


function MarkdownTransformStream() {

  var transformStream = new Transform({ objectMode: true });
  cache.posts = cache.posts || [];

  transformStream._transform = function(fileName, encoding, done) {
    var logger = rootLogger.child({
      transformer: 'Markdown',
      fileName: fileName 
    });

    logger.debug('Inside transform');
    var self = this;

    fs.readFile(fileName, 'utf8', function(err, content) {
      var doc = wmd(content);
      doc.src = fileName;
      var post = new Post(doc);
      self.push(post);
      cache.posts.push(post);
      done();
    });
  };

  transformStream._flush = function(done) {
    done();
  };

  return transformStream;
}

module.exports = MarkdownTransformStream;
