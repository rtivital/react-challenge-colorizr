import test from 'tape-catch';
import { objectUtils, assignStaticPropsToClass } from 'app/lib';

const { isObject, isEmpty, hasOwnProperty } = objectUtils;

test('Object module - objectUtils functions', (t) => {
  // isObject function tests
  t.equal(isObject({}), true, 'Expected isObject to treat empty object as object');
  t.equal(isObject({ a: 1 }), true, 'Expected isObject to treat object with keys as object');
  t.equal(isObject(function () {}), true, 'Expected isObject to treat function as object');
  t.equal(isObject(null), false, 'Expected isObject not to treat null as object');
  t.equal(isObject([]), false, 'Expected isObject not to treat empty array as object');
  t.equal(isObject([1, 2, 3]), false, 'Expected isObject not to treat array with items as object');

  // isEmpty function tests
  t.equal(isEmpty({}), true, 'Expected isEmpty to treat empty object as empty');
  t.equal(isEmpty({ a: 1 }), false, 'Expected isEmpty not to treat object with porp as empty');

  //hasOwnProperty function tests
  t.equal(hasOwnProperty({}, 'a'), false, 'Did not expect hasOwnProperty to find key in empty object');
  t.equal(hasOwnProperty('a', 'a'), false, 'Did not expect hasOwnProperty to find key in string');
  t.equal(hasOwnProperty([{ a: 1 }], 'a'), false, 'Did not expect hasOwnProperty to find key in array');
  t.equal(hasOwnProperty({ a: 1 }, 'a'), true, 'Expect hasOwnProperty to find key in object with props');

  t.end();
});

test('Object module - assignStaticPropsToClass function', (t) => {
  class CoolClass {};
  const properties = { a: 1, b: 'string', c: function() {}, d: new Date(), e: [1, 2, 3], __private: true };
  assignStaticPropsToClass(CoolClass, properties);

  Object.keys(properties).forEach((property) => {
    if (property.charAt(0) === '_') {
      t.equal(hasOwnProperty(CoolClass, property), false, 'Did not expect to assign private property to class');
    } else {
      t.equal(hasOwnProperty(CoolClass, property), true, `Expected to assign property ${property} to class`);
    }
  });

  t.end();
});
