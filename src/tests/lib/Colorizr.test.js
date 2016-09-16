import test from 'tape-catch';
import { Colorizr } from 'lib';

const CHANELS = ['r', 'g', 'b'];
const validColors = ['#fff', 'ccc', { r: 3, g: 56, b: 167 }, [34, 78, 56]];

test('Colorizr constructor tests', (t) => {
  validColors.forEach((validColor) => {
    const instance = new Colorizr(validColor);
    const { color } = instance;

    const chanels = Object.keys(color).sort();
    const values = chanels.map((chanel) => color[chanel]);

    t.deepEqual(
      chanels, CHANELS.slice(0).sort(),
      `Expected Colorizr to produce splitted color value with ${CHANELS.join(', ')} keys`
    );

    values.forEach((chanelValue) => {
      const valid = (
        typeof chanelValue === 'number'
        && chanelValue % 1 === 0
        && chanelValue >= 0
        && chanelValue <= 255
      );

      t.equal(
        valid, true,
        `Expected Colorizr to produce valid color chanel, but got ${chanelValue}`
      );
    });
  });

  t.end();
});
