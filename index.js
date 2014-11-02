'use strict';
var config = require('./config.js'),
    cache = require('./lib/cache.js'),
    glob = require('glob'),
    logger = require('./lib/logger.js'),
    MarkdownTransformStream = require('./lib/markdownTransform.js'),
    HtmlTransformStream = require('./lib/htmlTransformer.js'),
    PostWriter = require('./lib/postWriter.js'),
    indexWriter = require('./lib/indexWriter.js');

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

markdownTransformStream.end();
postWriter.on('end', indexWriter);

