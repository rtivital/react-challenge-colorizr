import test from 'tape-catch';
import { hex } from 'app/lib';

const development = process.env.NODE_ENV === 'development';

const randomValues = ['', NaN, null, {}, [1,3,4], 'hello', 29, new Date];
const invalidColors = ['#f', '#ff', '#ffff', '#fffff', '#zzz', 'f', 'f0', 'f000'];
const validColors = ['#7986cb', '#009688', 'fdd835', 'a1887f', 'c22', '#f45'];

test('HEX module - validateHex utility', (t) => {
  invalidColors.map((invalidColor) => {
    if (process.env.NODE_ENV === 'development') {
      t.throws(
        () => hex.validateHex(invalidColor),
        `Recieved value ${invalidColor} is not a valid HEX color`,
        `Expected to throw an error in dev environment with invalid color: ${invalidColor}`
      );
    } else {
      t.doesNotThrow(
        () => hex.validateHex(invalidColor),
        `Recieved value ${invalidColor} is not a valid HEX color`,
        `Did not expect to throw an error out of dev environment with invalid color: ${invalidColor}`
      );
    }
  });

  validColors.map((validColor) => {
    t.doesNotThrow(
      () => hex.validateHex(validColor),
      `Recieved value ${validColor} is not a valid HEX color`,
      `Did not expect to throw an error with valid color: ${validColor}`
    );


  });

  t.end();
});

test('HEX module - isHex function', (t) => {
  invalidColors.map((invalidColor) => {
    t.equal(hex.isHex(invalidColor), false, `Expected invalid color ${invalidColor} not to be hex`);
  });

  validColors.map((validColor) => {
    t.equal(hex.isHex(validColor), true, `Expected valid color ${validColor} to be hex`);
  });

  randomValues.map((randomValue) => {
    t.equal(hex.isHex(randomValue), false, `Expected random value ${randomValue} not to be hex`)
  });

  t.end();
});
