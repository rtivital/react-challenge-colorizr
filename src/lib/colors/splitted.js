import { isObject, hasOwnProperty } from '../object/utils';
import { validateChanel } from './validate';

const CHANELS = ['r', 'g', 'b'];

export function isSplittedColor(value) {
  if (Array.isArray(value)) {
    return value.every(validateChanel);
  }

  if (isObject(value)) {
    return CHANELS.every(
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

export function lumChanel(chanel, percent, factor = 1) {
  return Math.max(0, chanel - (255 * factor * percent / 100));
}

export function darken(value, percent) {
  if (Array.isArray(value)) {
    return value.map((chanel) => lumChanel(chanel, percent, -1));
  }

  const color = {};
  Object.keys(value).forEach((chanel) => {
    color[chanel] = lumChanel(value[chanel], percent, -1);
  });

  return color;
}
