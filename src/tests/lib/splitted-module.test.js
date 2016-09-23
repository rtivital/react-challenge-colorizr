import test from 'tape-catch';
import { splitted } from 'lib';

const validSplittedColors = [
  [1, 45, 168],
  [255, 255, 255],
  [0, 0, 0],
  { r: 1, g: 45, b: 168 },
  { r: 255, g: 255, b: 255 },
  { r: 0, g: 0, b: 0 },
];

const invalidSplittedColors = [
  [1, 45, 563],
  [255, 255, 256],
  [0, 0, -1],
  { r: 1, g: 45 },
  { r: 255, g: 255, d: 255 },
  { r: '34', g: 0, b: 0 },
];

const hasProp = (object, prop) => !!object && Object.prototype.hasOwnProperty.call(object, prop);
const validateChanel = (chanel) => (
  typeof chanel === 'number'
  && chanel % 1 === 0
  && chanel >= 0
  && chanel <= 255
);

test('Splitted color module - isSplittedColor function', (t) => {
  validSplittedColors.forEach((color) => {
    t.equal(splitted.isSplittedColor(color), true, `Treats ${color} as splitted`);
  });

  invalidSplittedColors.forEach((color) => {
    t.equal(splitted.isSplittedColor(color), false, `Treats ${color} as not splitted`);
  });

  t.end();
});

test('Splitted color module - convertSplittedToObject and convertSplittedToArray functions', (t) => {
  validSplittedColors.forEach((color) => {
    const object = splitted.convertSplittedToObject(color);
    const array = splitted.convertSplittedToArray(color);

    const isConvertedArray = (
      Array.isArray(array)
      && array.length === 3
      && array.every(validateChanel)
    );

    const isConvertedObject = (
      hasProp(object, 'r')
      && hasProp(object, 'g')
      && hasProp(object, 'b')
      && Object.keys(object).every((chanel) => validateChanel(object[chanel]))
    );

    t.equal(isConvertedArray, true, 'Converts valid splitted color to array');
    t.equal(isConvertedObject, true, 'Converts valid splitted color to object');
  });

  t.end();
});

const percent = 10;
const delimiter = percent / 100;
const darkener = (chanel) => parseInt(chanel - 255 / percent, 10);
const lightener = (chanel) => parseInt(chanel + 255 / percent, 10);

const mixChanels = (chanel, mixer) =>
  parseInt(chanel * delimiter + mixer * (1 - delimiter), 10);

const mixColors = (color, mixer) =>
  color.map((chanel, index) => mixChanels(chanel, mixer[index]));

const black = [0, 0, 0];
const white = [255, 255, 255];
const gray = [70, 70, 70];
const red = [200, 0, 0];
const green = [0, 200, 0];
const blue = [0, 0, 200];

const lightenBlack = black.map(lightener);
const darkenedWhite = white.map(darkener);
const lightenedGray = gray.map(lightener);
const darkenedGray = gray.map(darkener);

const mixed = [
  { colors: [black, white] },
  { colors: [black, blue] },
  { colors: [white, green] },
  { colors: [white, red] },
  { colors: [red, blue] },
  { colors: [green, red] },
  { colors: [blue, red] },
];

const mixedTests = mixed.map((sample) => {
  const result = {};
  result.expected = mixColors(...sample.colors, percent);
  result.result = splitted.mix(...sample.colors, percent, true);
  return result;
});

test('Splitted color module - lighten function', (t) => {
  const { lighten } = splitted;
  t.deepEqual(lighten(white, percent), white, 'Does not lighten white color');
  t.deepEqual(lighten(black, percent), lightenBlack, 'Lightens black color');
  t.deepEqual(lighten(gray, percent), lightenedGray, 'Lightens gray color');
  t.end();
});

test('Splitted color module - darken function', (t) => {
  const { darken } = splitted;
  t.deepEqual(darken(black, percent), black, 'Does not darken black color');
  t.deepEqual(darken(white, percent), darkenedWhite, 'Darkens light color');
  t.deepEqual(darken(gray, percent), darkenedGray, 'Darkens gray color');
  t.end();
});

test('Splitted color module - mix function', (t) => {
  mixedTests.forEach(({ expected, result }) => {
    t.deepEqual(expected, result, `Mixed ${expected} and ${result} colors`);
  });

  t.end();
});
