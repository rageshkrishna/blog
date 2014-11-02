'use strict';
var logger = require('./logger.js'),
    Transform = require('stream').Transform;

function HtmlTransformStream() {
  logger = logger.child({ transformer: 'Html' });

  var transformStream = new Transform({ objectMode: true });

  transformStream._transform = function(data, encoding, done) {
    logger = logger.child({ fileName: data.src });
    logger.debug('Inside transform');
    this.push(data.html);
    done();
  };

  transformStream._flush = function(done) {
    done();
  };

  return transformStream;
}

module.exports = HtmlTransformStream;
