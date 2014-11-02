'use strict';
var path = require('path');
var config = {
  url: 'https://rageshkrishna.com',
  postsGlobPattern: path.resolve(__dirname, './_posts/*.md'),
  template: path.resolve(__dirname, './templates/post.tmpl'),
  outputPath: path.resolve(__dirname, './posts')
};

module.exports = config;
