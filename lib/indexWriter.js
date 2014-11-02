'use strict';
var cache = require('./cache.js'),
    logger = require('./logger.js'),
    _ = require('underscore'),
    fs = require('fs'),
    config = require('../config.js');

function indexWriter() {
  logger.debug('Entered index writer');
  var template = fs.readFileSync(config.templates.index, 'utf-8');
  logger.debug(template, 'Index template');
  template = _.template(template);
  var sorted = _.sortBy(cache.posts, function(post) {
    return post.publishDate;
  }).reverse();

  var latest = _.first(sorted, 3);

  var index = template({ latest: latest });

  fs.writeFileSync('posts/index.html', index);


}

module.exports = indexWriter;
