'use strict';

var path = require('path');

// Glob package to read files with minimatch
// https://github.com/isaacs/node-glob
var glob = require('glob');

// Module to write JSON Data to file
// https://www.npmjs.com/package/jsonfile
var jsonfile = require('jsonfile');

// Make sure to run filterColors to escape all invalid color values
var filterColors = require('./filterColors');

glob('utils/color-**/*.json', function(err, files) {
  if (err) { throw new Error(err); }

  var generatedColors = {
    presets: {},
    schemes: {}
  };

  files.forEach(function(fileName) {
    var content = jsonfile.readFileSync(fileName);

    // Make sure all passed strings contain valid color value
    var colors = filterColors(content.colors);

    // Grab type prop from jsonfile
    // content.type === 'preset' then required generatedColors prop will be 'presets'
    var type = content.type + 's';

    // Grab both scheme and preset name
    var name = content.name;

    // Make sure filterColors function return an array of colors
    // and prevent from writing unknown types to generatedColors object
    if (colors && type in generatedColors) {
      generatedColors[type][content.name] = colors;
    }

  });

  jsonfile.writeFile(
    // path to file
    path.join(__dirname, '../', 'public', 'colors.json'),
    // object to write to file
    generatedColors,
    // here goes an error! (https://goo.gl/8GByf6)
    function(err) { if (err) { throw new Error(err); } }
  );
});
