'use strict';
var logger = require('./logger.js'),
    Writable = require('stream').Writable,
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');

function PostWriter(config) {
  var postWriterStream = new Writable({ objectMode: true });
  postWriterStream._write = function(post, enc, next) {
    var postPath = path.join(config.outputPath, post.relativePath);
    logger.info('Writing post', postPath);
    mkdirp.sync(path.dirname(postPath));
    fs.writeFileSync(postPath, post.finalHtml, 'utf-8');
    next();
  };
  postWriterStream.end = function() {
    postWriterStream.emit('end');
  };
  return postWriterStream;
}

module.exports = PostWriter;
