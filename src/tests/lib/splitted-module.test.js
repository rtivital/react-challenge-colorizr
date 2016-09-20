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

test('Splitted color module - isSplittedColor function', (t) => {
  validSplittedColors.forEach((color) => {
    t.equal(splitted.isSplittedColor(color), true, `Expected to treat ${color} as splitted`);
  });

  invalidSplittedColors.forEach((color) => {
    t.equal(splitted.isSplittedColor(color), false, `Expected to treat ${color} as not splitted`);
  });

  t.end();
});
