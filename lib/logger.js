'use strict';
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'blog' });
log.level('debug');
module.exports = log;
