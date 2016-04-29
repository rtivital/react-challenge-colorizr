'use strict';

var ghPages = require('gh-pages');
var path = require('path');

// Module colors (https://github.com/marak/colors.js/) just for UX
var colors = require('colors');

var config = {
  message: 'Publish Colorizr App'
};

ghPages.publish(path.join(__dirname, '../', 'public'), config, function(err) {
  if (err) { console.log(err); }
  console.log('Successfully Deployed to Github Pages'.green.bold);
});
