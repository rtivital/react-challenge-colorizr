import test from 'tape-catch';
import { Colorizr } from 'app/lib';

const chanels = ['r', 'g', 'b'];
const validColors = ['#fff', 'ccc', { r: 3, g: 56, b: 167 }, [34, 78, 56]];

test('Colorizr constructor tests', (t) => {
  validColors.forEach((validColor) => {
    const instance = new Colorizr(validColor);
    t.equal(
      Object.keys(instance).every((key) => chanels.some((chanel) => chanel === key)), true,
      `Expected Colorizr to produce splitted color value with ${chanels.join(', ')} keys`
    );
  });

  t.end();
});
