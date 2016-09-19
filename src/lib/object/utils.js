/**
 * isObject - Function for checking if provided value is actually an object,
 *  not array, not function, just an object
 *
 * @param  {*} value - any sort of value to test
 * @return {boolean}
 *
 * @example
 * isObject(null); // false
 * isObject([]); // false
 * isObject({}); // true
 */
export function isObject(value) {
  const type = typeof value;
  return (type === 'object' || type === 'function') && value !== null && !Array.isArray(value);
}

/**
 * isEmpty - Safe function for checking if provided value is an empty object
 *
 * @param  {*} value - any value to test
 * @return {boolean} - checks if value is an object and at least has one key
 *
 * @example
 * isEmpty({}); // true
 * isEmpty({ a: 1 }); // false
 */
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
  return !!value && Object.prototype.hasOwnProperty.call(value, prop);
}
