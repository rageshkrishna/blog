'use strict';
var path = require('path');
var config = {
  url: 'https://rageshkrishna.com',
  postsGlobPattern: path.resolve(__dirname, './posts/*.md'),
  template: path.resolve(__dirname, './templates/post.html')
};

module.exports = config;
