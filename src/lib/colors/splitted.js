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

function lumChanel(chanel, percent, factor = 1) {
  return Math.min(Math.max(0, chanel - (255 * factor * percent / 100)), 255);
}

function applyToChanels(value, callback, ...args) {
  if (Array.isArray(value)) {
    return value.map((chanel) => callback.call(null, chanel, ...args));
  }

  const color = {};
  Object.keys(value).forEach((chanel) => {
    color[chanel] = callback.call(null, value[chanel], ...args);
  });

  return color;
}

export function darken(value, percent) {
  return applyToChanels(lumChanel, percent, -1);
}

export function lighten(value, percent) {
  return applyToChanels(lumChanel, percent, 1);
}
