import test from 'tape-catch';
import { objectUtils, assignStaticPropsToClass } from 'lib';

const { isObject, isEmpty, hasOwnProperty } = objectUtils;

test('Object module - objectUtils functions', (t) => {
  // isObject function tests
  t.equal(isObject({}), true, 'isObject treats empty object as object');
  t.equal(isObject({ a: 1 }), true, 'isObject treats object with keys as object');
  t.equal(isObject(() => {}), true, 'isObject treats function as object');
  t.equal(isObject(null), false, 'isObject does not treat null as object');
  t.equal(isObject([]), false, 'isObject does not treat empty array as object');
  t.equal(isObject([1, 2, 3]), false, 'isObject does not treat array with items as object');

  // isEmpty function tests
  t.equal(isEmpty({}), true, 'isEmpty treats empty object as empty');
  t.equal(isEmpty({ a: 1 }), false, 'isEmpty does not treat object with porp as empty');
  t.equal(isEmpty([]), true, 'isEmpty treats array as empty');
  t.equal(isEmpty([{ a: 1 }]), true, 'isEmpty treats array with object as empty');
  t.equal(isEmpty(f => f), true, 'isEmpty treats array with object as empty');

  // hasOwnProperty function tests
  t.equal(hasOwnProperty({}, 'a'), false, 'hasOwnProperty does not find key in empty object');
  t.equal(hasOwnProperty('a', 'a'), false, 'hasOwnProperty does not find key in string');
  t.equal(hasOwnProperty([{ a: 1 }], 'a'), false, 'hasOwnProperty does not find key in array');
  t.equal(hasOwnProperty({ a: 1 }, 'a'), true, 'hasOwnProperty finds key in object with props');
  t.equal(hasOwnProperty(undefined, 'a'), false, 'hasOwnProperty does not find key in undefined');
  t.equal(hasOwnProperty(null, 'a'), false, 'hasOwnProperty does not find key in null');

  t.end();
});

test('Object module - assignStaticPropsToClass function', (t) => {
  class CoolClass {}
  const props = { a: 1, b: 'string', c() {}, d: new Date(), e: [1, 2, 3], __private: true };
  assignStaticPropsToClass(props)(CoolClass);

  Object.keys(props).forEach((property) => {
    if (property.charAt(0) === '_') {
      t.equal(hasOwnProperty(CoolClass, property), false, 'Private property was not assigned to class');
    } else {
      t.equal(hasOwnProperty(CoolClass, property), true, `Property ${property} was assigned to class`);
    }
  });

  class AnotherCoolClass {}
  const anotherProps = { f: 'another prop', g: 'one more', __anotherPrivate: 'here' };
  assignStaticPropsToClass(props, anotherProps)(AnotherCoolClass);

  Object.keys({ ...props, ...anotherProps }).forEach((property) => {
    if (property.charAt(0) === '_') {
      t.equal(
        hasOwnProperty(AnotherCoolClass, property), false,
        'Private property was not assigned to class from multiple entries'
      );
    } else {
      t.equal(
        hasOwnProperty(AnotherCoolClass, property), true,
        `Property ${property} was assigned to class from multiple entries`
      );
    }
  });

  t.end();
});
