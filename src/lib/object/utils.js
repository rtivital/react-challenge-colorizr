export function isObject(value) {
  const type = typeof value;
  return (type === 'object' || type === 'function') && value !== null && !Array.isArray(value);
}

export function isEmpty(value) {
  if (!isObject(value)) { return true; }
  return !Object.keys(value).length;
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
  return value && Object.prototype.hasOwnProperty.call(value, prop);
}
