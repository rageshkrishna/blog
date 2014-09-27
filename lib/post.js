'use strict';
var moment = require('moment'),
    slug = require('slug');

function Post(doc) {
  var self = this;

  var metadata = doc.metadata;
  self.title = metadata.title;
  self.publishDate = metadata.publishDate &&
    new Date(metadata.publishDate);
  self.datePath = self.publishDate && moment(self.publishDate)
    .format('YYYY/MM/DD');
  self.slug = metadata.slug || slug(self.title);
  self.categories = [];
  self.html = doc.html;

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
