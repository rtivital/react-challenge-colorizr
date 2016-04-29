'use strict';

var path = require('path');

// Module to write JSON Data to file
// https://www.npmjs.com/package/jsonfile
var jsonfile = require('jsonfile');

// Make sure to run filterColors to escape all bad values
var filterColors = require('./filterColors');

// Flat colors preset, some grabbed from here: https://flatuicolors.com/
var flatColors = filterColors([
  "#26b99a", "#4fba6f", "#14a085", "#24ae5f", "#3b97d3", "#2980ba", "#955ba5",
  "#894b9d", "#35495e", "#2c3e50", "#f0c419", "#f29c1f", "#e57e25", "#d25627",
  "#e64c3c", "#c03a2b", "#ecf0f1", "#bdc3c7", "#95a5a5", "#7f8c8d"
]);

// Material colors preset, all grabbed from http://www.materialui.co/colors
var materialColors = filterColors([
  "#d32f2f", "#ad1457", "#6a1b9a", "#4527a0", "#283593", "#1565C0",
  "#0277bd", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24",
  "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242",
  "#37474f"
]);

var yourColorsHere = filterColors([]);

var generatedColors = {
  flat: flatColors,
  materialColors: materialColors
  // yourColorsName: yourColorsArrayHere
};

jsonfile.writeFile(
  // path to file
  path.join(__dirname, '../', 'public', 'presets.json'),
  // object to write to file
  generatedColors,
  // here goes an error! (https://goo.gl/8GByf6)
  function(err) { if (err) { console.log(err.red); } }
);
