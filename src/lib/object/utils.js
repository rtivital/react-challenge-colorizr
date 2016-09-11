export function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isEmpty(value) {
  if (!isObject(value)) { return true; }
  return Object.keys(value).length > 0;
}

/**
 * hasOwnProperty - Safe function for checking property existence
 * @param {*} value - value to search property in
 * @param {string} prop - property to search for
 * @returns {boolean}
 *
 * @example
 * hasOwnProperty({ hello: 'there' }, 'hello'); // true
 * hasOwnProperty(undefined, 'a'); // false
 */
export function hasOwnProperty(value, prop) {
  return Object.prototype.hasOwnProperty.call(value, prop);
}
