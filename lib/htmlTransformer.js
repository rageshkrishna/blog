'use strict';
var logger = require('./logger.js'),
    fs = require('fs'),
    Transform = require('stream').Transform,
    _ = require('underscore');

function HtmlTransformStream(config) {
  logger = logger.child({ transformer: 'Html' });
  logger.debug('config.template', config.template);
  var postTemplate = fs.readFileSync(config.templates.post, 'utf-8');
  postTemplate = _.template(postTemplate);

  var transformStream = new Transform({ objectMode: true });

  transformStream._transform = function(post, encoding, done) {
    logger = logger.child({ fileName: post.src });
    logger.debug('Inside transform');
    post.finalHtml = postTemplate({ post: post });
    this.push(post);
    done();
  };

  transformStream._flush = function(done) {
    done();
  };

  return transformStream;
}

module.exports = HtmlTransformStream;
