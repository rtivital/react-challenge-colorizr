/* eslint-disable max-len */
import test from 'tape-catch';
import { hex } from 'lib';


// -------------------------------------------------------
// validateHex development utility and isHex function tests
// -------------------------------------------------------
const randomValues = ['', NaN, null, {}, [1, 3, 4], 'hello', 29, new Date()];
const invalidColors = ['#f', '#ff', '#ffff', '#fffff', '#zzz', 'f', 'f0', 'f000'];
const validColors = ['#7986cb', '#009688', '#f45', 'fdd835', 'a1887f', 'c22'];

test('HEX module - validateHex utility', (t) => {
  invalidColors.forEach((invalidColor) => {
    if (process.env.NODE_ENV === 'development') {
      t.throws(
        () => hex.validateHex(invalidColor),
        `Recieved value ${invalidColor} is not a valid HEX color`,
        `Throw an error in dev environment with invalid color: ${invalidColor}`
      );
    } else {
      t.doesNotThrow(
        () => hex.validateHex(invalidColor),
        `Recieved value ${invalidColor} is not a valid HEX color`,
        `Do not throw an error out of dev environment with invalid color: ${invalidColor}`
      );
    }
  });

  validColors.forEach((validColor) => {
    t.doesNotThrow(
      () => hex.validateHex(validColor),
      `Recieved value ${validColor} is not a valid HEX color`,
      `Do not throw an error with valid color: ${validColor}`
    );
  });

  t.end();
});

test('HEX module - isHex function', (t) => {
  invalidColors.forEach((invalidColor) => {
    t.equal(hex.isHex(invalidColor), false, `Invalid color ${invalidColor} is not treated as hex`);
  });

  validColors.forEach((validColor) => {
    t.equal(hex.isHex(validColor), true, `Valid color ${validColor} is treated as hex`);
  });

  randomValues.forEach((randomValue) => {
    t.equal(hex.isHex(randomValue), false, `Random value ${randomValue} is not treated as hex`);
  });

  t.end();
});


// -------------------------------------------------------
// isPrefixedHex and isUnprefixedHex tests
// -------------------------------------------------------
const prefixedHex = ['#7986cb', '#009688', '#f45'];
const unprefixedHex = ['fdd835', 'a1887f', 'c22'];

test('HEX module - isUnprefixedHex and isPrefixedHex functions', (t) => {
  unprefixedHex.forEach((unprefixed) => {
    const message = `${unprefixed} is detected as unprefixed hex value`;
    t.equal(hex.isUnprefixedHex(unprefixed), true, message);
    t.equal(hex.isPrefixedHex(unprefixed), false, message);
  });

  prefixedHex.forEach((prefixed) => {
    const message = `${prefixed} is not detected as prefixed hex value`;
    t.equal(hex.isUnprefixedHex(prefixed), false, message);
    t.equal(hex.isPrefixedHex(prefixed), true, message);
  });

  t.end();
});

test('HEX module - unprefixHex and prefixHex functions', (t) => {
  unprefixedHex.forEach((unprefixed) => {
    t.equal(hex.unprefixHex(unprefixed), unprefixed, 'unprefixHex does not modify unprefixed values');
    t.equal(hex.prefixHex(unprefixed), `#${unprefixed}`, 'prefixHex adds prefix to unprefixedHex');
  });

  prefixedHex.forEach((prefixed) => {
    t.equal(hex.unprefixHex(prefixed), prefixed.slice(1), 'unprefixHex does not modify prefixed values');
    t.equal(hex.prefixHex(prefixed), prefixed, 'prefixHex do modify prefixed values');
  });

  t.end();
});


// -------------------------------------------------------
// createLongHex function tests
// -------------------------------------------------------
const shortPrefixed = ['#ccc', '#ddd', '#d41'];
const shortUnprefixed = ['ccc', 'ddd', 'd41'];
const short = [...shortPrefixed, ...shortUnprefixed];

const longPrefixed = ['#cccccc', '#dddddd', '#dd4411'];
const longUnprefixed = ['cccccc', 'dddddd', 'dd4411'];
const long = [...longPrefixed, ...longUnprefixed];

test('HEX module - createLongHex function', (t) => {
  short.forEach((shortHex, index) => {
    t.equal(
      hex.createLongHex(shortHex, true),
      hex.prefixHex(long[index]),
      `Creates long prefixed value from short ${shortHex}`
    );

    t.equal(
      hex.createLongHex(shortHex, false),
      hex.unprefixHex(long[index]),
      `Creates long unprefixed value from short ${shortHex}`
    );
  });

  long.forEach((longHex) => {
    t.equal(
      hex.createLongHex(longHex, true),
      hex.prefixHex(longHex),
      `Creates long prefixed value from long ${longHex}`
    );

    t.equal(
      hex.createLongHex(longHex, false),
      hex.unprefixHex(longHex),
      `Creates long unprefixed value from long ${longHex}`
    );
  });

  t.end();
});


// -------------------------------------------------------
// splitHex, createLongHex and chanelToHex functions tests
// -------------------------------------------------------
function assignSplittedHex(object, hexString, chanels) {
  Object.defineProperty(object, hexString, {
    value: {
      array: chanels,
      object: { r: chanels[0], g: chanels[1], b: chanels[2] },
    },
  });
}

function createChanel(chanel, converted) {
  return { chanel, converted };
}

const splittedHex = {};
assignSplittedHex(splittedHex, '#fff', [255, 255, 255]);
assignSplittedHex(splittedHex, 'c56', [204, 85, 102]);
assignSplittedHex(splittedHex, '#34f68c', [52, 246, 140]);
assignSplittedHex(splittedHex, '50ff4c', [80, 255, 76]);

// mergeHex function will always return long hex value
const mergedHex = {};
assignSplittedHex(mergedHex, '#ffffff', [255, 255, 255]);
assignSplittedHex(mergedHex, 'ffffff', [255, 255, 255]);
assignSplittedHex(mergedHex, '#34f68c', [52, 246, 140]);
assignSplittedHex(mergedHex, '34f68c', [52, 246, 140]);

const chanels = [
  createChanel(255, 'ff'),
  createChanel(0, '00'),
  createChanel(15, '0f'),
];

test('HEX module - splitHex function', (t) => {
  Object.keys(splittedHex).forEach((hexString) => {
    const { array, object } = splittedHex[hexString];
    t.deepEqual(hex.splitHex(hexString, 'object'), object, `Splits hex ${hexString} to object`);
    t.deepEqual(hex.splitHex(hexString, 'array'), array, `Splits hex ${hexString} to array`);
  });

  t.end();
});

test('HEX module - chanelToHex function', (t) => {
  chanels.forEach(({ chanel, converted }) => {
    t.equal(hex.chanelToHex(chanel), converted, `Converts chanel ${chanel} to hex format`);
  });

  t.end();
});

test('HEX module - mergeHex function', (t) => {
  Object.keys(mergedHex).forEach((hexString) => {
    const { array, object } = mergedHex[hexString];

    t.equal(
      hex.mergeHex(array, true),
      hex.prefixHex(hexString),
      `Merges hex ${hexString} with prefix from array ${array}`
    );

    t.equal(
      hex.mergeHex(array, false),
      hex.unprefixHex(hexString),
      `Merges hex ${hexString} without prefix from array ${array}`
    );

    t.equal(
      hex.mergeHex(object, true),
      hex.prefixHex(hexString),
      `Merges hex ${hexString} with prefix from object ${object}`
    );

    t.equal(
      hex.mergeHex(object, false),
      hex.unprefixHex(hexString),
      `Merges hex ${hexString} without prefix from object ${object}`
    );
  });

  t.end();
});
