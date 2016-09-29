import { clamp } from 'lodash';
import { isObject, hasOwnProperty } from '../object/utils';

const CHANELS = ['r', 'g', 'b'];

function validateChanel(chanel) {
  return (
    typeof chanel === 'number' // should always be a number
    && chanel % 1 === 0 // integer number, also detects NaN
    && chanel >= 0
    && chanel <= 255
  );
}

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

export function convertSplittedToArray(value) {
  if (Array.isArray(value)) { return value; }
  if (isObject(value)) {
    return [value.r, value.g, value.b];
  }

  return value;
}

function lumChanel(chanel, percent, factor = 1) {
  return parseInt(clamp(chanel - (chanel * factor * percent / 100), 0, 255), 10);
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
  return applyToChanels(value, lumChanel, percent, 1);
}

export function lighten(value, percent) {
  return applyToChanels(value, lumChanel, percent, -1);
}

export function getLuminosity(value) {
  const color = convertSplittedToObject(value);
  const { r, g, b } = color;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 * 100;
}

export function mix(value, mixer, percent, array = false) {
  const color = convertSplittedToObject(value);
  const colorToMix = convertSplittedToObject(mixer);
  const mixed = {};

  Object.keys(color).forEach((chanel) => {
    const delimeter = percent / 100;
    mixed[chanel] = parseInt(color[chanel] * delimeter + colorToMix[chanel] * (1 - delimeter), 10);
  });

  return array ? convertSplittedToArray(mixed) : mixed;
}
