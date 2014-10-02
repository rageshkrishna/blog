'use strict';
var generatePosts = require('./lib/generator.js'),
    logger = require('./lib/logger.js');

var postStream = generatePosts();

postStream.on('error', function(err) {
  logger.error(err, 'Error from post stream');
});
postStream.on('readable', function() {
  logger.debug('Reading post stream');
  var post = postStream.read();
  logger.debug({ post: post }, 'Got a post');
});
postStream.on('end', function() {
  logger.debug('Post stream processed completely');
});


