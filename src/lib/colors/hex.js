/** @module HEX */

/**
 * validateHex - Utility function for HEX color validation that throws errors while development
 *
 * @param {string} value - value to test
 *
 * @example
 * validateHex('#fff');     // it's ok
 * validateHex('#00000');   // TypeError
 * isUnprefixedHex('zzz');  // TypeError
 * isUnprefixedHex();       // TypeError
 */
export function validateHex(value) {
  if (!isHex(value) && process.env.NODE_ENV === 'development') {
    throw new TypeError(`Recieved value ${value} is not a valid HEX color`);
  }
}

/**
 * isUnprefixedHex - Tests if provided HEX color does not contain hash
 *
 * @param {string} value - HEX color to test
 * @return {boolean}
 *
 * @example
 * isUnprefixedHex('#fff');    // false
 * isUnprefixedHex('#000000'); // false
 * isUnprefixedHex('fff');     // true
 * isUnprefixedHex('000000');  // true
 */
export function isUnprefixedHex(value) {
  return /(^[0-9A-F]{3}$)|(^[0-9A-F]{6}$)/i.test(value);
}

/**
 * isPrefixedHex - Tests if provided HEX color does contain hash
 *
 * @param {string} value - HEX color to test
 * @return {boolean}
 *
 * @example
 * isPrefixedHex('#fff');    // true
 * isPrefixedHex('#000000'); // true
 * isPrefixedHex('fff');     // false
 * isPrefixedHex('000000');  // false
 */
export function isPrefixedHex(value) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
}

/**
 * isHex -Tests if provided color value is HEX color, both xxx and #xxx values are accepted
 *
 * @param {string} value
 * @return {boolean}
 *
 * @example
 * isHex('#fff');    // true
 * isHex('#000000'); // true
 * isHex('fff');     // true
 * isHex('000000');  // true
 */
export function isHex(value) {
  if (typeof value !== 'string') { return false; }
  return isUnprefixedHex(value) || isPrefixedHex(value);
}

/**
 * unprefixHex - Used to unprefix HEX color value (remove hash character at position 0)
 *
 * @param {string} value - HEX color with (#fff) or without hash (fff)
 * @return {string} hex color value formated like fff or fff
 *
 * @example
 * unprefixHex('#ccc');    // ccc
 * unprefixHex('#000000'); // 000000
 * unprefixHex('ccc');     // ccc
 * unprefixHex('#zzz');    // TypeError
 * unprefixHex();          // TypeError
 */
export function unprefixHex(value) {
  validateHex(value);
  return isUnprefixedHex(value) ? value : value.slice(1);
}

/**
 * prefixHex - Used to prefix HEX color value (add hash character to position 0)
 *
 * @param {string} value - HEX color with (#fff) or without hash (fff)
 * @return {string} hex color value formated like fff or #fff
 *
 * @example
 * prefixHex('#ccc');   // #ccc
 * prefixHex('000000'); // #000000
 * prefixHex('ccc');    // #ccc
 * prefixHex('#zzz');   // TypeError
 * prefixHex();         // TypeError
 */
export function prefixHex(value) {
  validateHex(value);
  return isPrefixedHex(value) ? value :`#${value}`;
}

/**
 * createLongHex - Creates long hex value from provided HEX color
 *
 * @param {string} value - color to work with
 * @param {boolean} [prefixed=false] - passed if value should be prefixed
 * @return {string} HEX color with format ffffff or #ffffff
 *
 * @example
 * createLongHex('#fff', true); // #ffffff
 * createLongHex('#ccc');       // cccccc
 * createLongHex('#cccccc');    // cccccc
 * createLongHex('#zzz');       // TypeError
 * createLongHex();             // TypeError
 */
export function createLongHex(value, prefixed = false) {
  validateHex(value);

  const hex = unprefixHex(value);
  if (hex.length === 6) { return prefixed ? prefixHex(value) : hex; }

  const longHex = hex.split('').map((chr) => chr + chr).join('');
  return prefixed ? prefixHex(longHex) : longHex;
}

/**
 * splitHex - Splits hex color to separate chanels (r, g, b)
 *
 * @param {string} value - color to work with
 * @param {boolean} [splitType='object'] - array or object split type
 * @return {Object|Array} - splitted hex value
 *
 * @example
 * splitHex('#fff');          // { r: 255, g: 255, b: 255 }
 * splitHex('#ccc', 'array'); // [204, 204, 204]
 * splitHex('000000');        // { r: 0, g: 0, b: 0 }
 * splitHex('#zzz');          // TypeError
 * splitHex();                // TypeError
 */
export function splitHex(color, splitType = 'object') {
  validateHex(color);
  const hex = createLongHex(color);
  const chanels = [];

  for (let i = 0; i < hex.length; i += 2) {
    chanels.push(parseInt(hex.slice(i, i + 2), 16));
  }

  return splitType === 'object'
    ? { r: chanels[0], g: chanels[1], b: chanels[2] }
    : chanels;
}

/**
 * chanelToHex - Turns decimal chanel value to hex
 *
 * @param  {number} chanel - red, green or blue chanel
 * @return {string}
 *
 * @example
 * chanelToHex(255); // 'ff'
 * chanelToHex(15);  // '0f'
 * chanelToHex(0);   // '00'
 */
export function chanelToHex(chanel) {
  const value = chanel.toString(16);
  return value.length === 2 ? value : `0${value}`;
}

/**
 * mergeHex - Merges splited hex value to string
 *
 * @param  {Array|Object} value - object with keys r, g, b or array with three numbers
 * @param  {boolean} [prefix = true] - passed if hex should be prefixed
 * @return {string} - HEX string
 */
export function mergeHex(value, prefix = true) {
  let color = '';

  if (Array.isArray(value)) {
    color = value.map(chanelToHex).join('');
  } else if (typeof value === 'object' && value !== null) {
    color += chanelToHex(value.r);
    color += chanelToHex(value.g);
    color += chanelToHex(value.b);
  }

  return prefix ? `#${color}` : color;
}
