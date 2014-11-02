'use strict';
var config = require('./config.js'),
    glob = require('glob'),
    logger = require('./lib/logger.js'),
    MarkdownTransformStream = require('./lib/markdownTransform.js'),
    HtmlTransformStream = require('./lib/htmlTransformer.js');

var matchingFiles = glob.sync(config.postsGlobPattern, null);

var markdownTransformStream = new MarkdownTransformStream();
var htmlTransformStream = new HtmlTransformStream();

markdownTransformStream.pipe(htmlTransformStream);

htmlTransformStream.on('readable', function() {
  var html = htmlTransformStream.read();
  logger.debug({ html: html }, 'HTML output');
});

matchingFiles.forEach(function(match) {
  markdownTransformStream.write(match);
});

logger.debug('All done!');
