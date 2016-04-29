'use strict';

var path = require('path');

// Module delete (https://www.npmjs.com/package/delete)
// Remove generated css and js files to escape side-effects
var del = require('delete');

// Module colors (https://github.com/marak/colors.js/) just for UX
var colors = require('colors');

// Settings
var publicFolder = 'public';
var filesToDelete = ['style.css', 'bundle.js'];

var pathsToFiles = filesToDelete.map(function(file) {
  return path.join(__dirname, '../', publicFolder, file);
});

del(pathsToFiles, function(err) {
  if (err) { console.log(err); }

  var deletedFiles = filesToDelete.map(function(file) {
    return publicFolder + '/' + file;
  }).join(', ');

  console.log(('Successfully deletedFiles: ' + deletedFiles).green.bold);
});
