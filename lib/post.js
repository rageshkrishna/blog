'use strict';
var moment = require('moment-timezone'),
    slug = require('slug'),
    path = require('path'),
    config = require('../config.js');

function Post(doc) {
  var self = this;

  var metadata = doc.metadata;
  self.title = metadata.title;
  self.publishDate = metadata.publishDate &&
    moment.tz(metadata.publishDate, config.timezone).toDate();
  self.datePath = self.publishDate && moment(self.publishDate)
    .format('YYYY/MM/DD');
  self.slug = metadata.slug || slug(self.title);
  self.categories = [];
  self.html = doc.html;
  self.src = doc.src;
  self.relativePath = path.join(self.datePath, self.slug + '.html');

  if (metadata.categories) {
    metadata.categories
      .split(',')
      .forEach(trimCategory);
  }

  function trimCategory(category) {
    self.categories.push(category.trim());
  }
}

module.exports = Post;
