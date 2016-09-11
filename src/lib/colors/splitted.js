import { isObject, hasOwnProperty } from '../object/utils';
import { validateChanel } from './validate';

export function isSplittedColor(value) {
  if (Array.isArray(value)) {
    return value.every(validateChanel);
  }

  if (isObject(value)) {
    return ['r', 'g', 'b'].every(
      (chanel) => hasOwnProperty(value, chanel) && validateChanel(value[chanel])
    );
  }

  return false;
}

export function convertSplittedToObject(value) {
  if (isObject(value)) { return value; }
  if (Array.isArray(value)) {
    return {
      r: value[0],
      g: value[1],
      b: value[2],
    };
  }

  return value;
}
