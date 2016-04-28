'use strict';

var ghPages = require('gh-pages');
var path = require('path');

var config = {
  message: 'Publish Colorizr App'
};

ghPages.publish(path.join(__dirname, 'public'), config, function(err) {
  if (err) { console.log(err); }
});
