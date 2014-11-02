'use strict';
var path = require('path');
var config = {
  url: 'https://rageshkrishna.com',
  postsGlobPattern: path.resolve(__dirname, './_posts/*.md'),
  templates: {
    post: path.resolve(__dirname, './templates/post.tmpl'),
    index: path.resolve(__dirname, './templates/index.tmpl')
  },
  
  outputPath: path.resolve(__dirname, './posts'),
  timezone: 'Asia/Kolkata'
};

module.exports = config;
