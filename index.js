'use strict';
var config = require('./config.js'),
    glob = require('glob'),
    logger = require('./lib/logger.js'),
    MarkdownTransformStream = require('./lib/markdownTransform.js'),
    HtmlTransformStream = require('./lib/htmlTransformer.js'),
    PostWriter = require('./lib/postWriter.js');

var matchingFiles = glob.sync(config.postsGlobPattern, null);

var markdownTransformStream = new MarkdownTransformStream();
var htmlTransformStream = new HtmlTransformStream(config);
var postWriter = new PostWriter(config);

markdownTransformStream.
  pipe(htmlTransformStream).
  pipe(postWriter);


matchingFiles.forEach(function(match) {
  markdownTransformStream.write(match);
});

logger.debug('All done!');
