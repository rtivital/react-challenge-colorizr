'use strict';

const path = require('path');
const ghpages = require('gh-pages');
const colors = require('colors');

ghpages.publish(path.join(__dirname, '../public'), err => {
  if (err) {
    console.log(err);
    return null;
  }

  console.log('Successfully deployed to gh-pages'.green);
});
