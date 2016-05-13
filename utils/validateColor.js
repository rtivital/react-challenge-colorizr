'use strict';

// Regex to test color values
var testRegex = {
  // hex without `#` is not valid, sorry, that's my rule
  hex: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
  // can't even imagine how that re is constructed
  // but it works just fine, I found it here http://goo.gl/javj9B
  rgb: /rgb\(\s*(?:(?:\d{1,2}|1\d\d|2(?:[0-4]\d|5[0-5]))\s*,?){3}\)$/
};

// Functions below use regular expressions that were specified above ^^^
// to test if color can be added to json file
var isValidHex = function(color) {
  return testRegex.hex.test(color);
};

var isValidRgb = function(color) {
  return testRegex.rgb.test(color);
};

var isValidColor = function(color) {
  return isValidHex(color) || isValidRgb(color);
};

module.exports = {
  isValidHex: isValidHex,
  isValidRgb: isValidRgb,
  isValidColor: isValidColor
};
