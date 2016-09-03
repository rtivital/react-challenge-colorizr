import React from 'react';
import test from 'tape-catch';
import { shallow } from 'enzyme';
import { ColorDisplay } from 'app/components';

const formated = '#FFFFFF';
const unformated = '#fff';

const getBackgound = (shallowed) => shallowed.prop('style').backgroundColor;

const selectors = {
  display: '.color-display__display',
  hexContainer: '.color-display__hex-value',
  icon: {
    base: '.color-display__icon',
    dark: 'color-display__icon--dark',
    light: 'color-display__icon--light',
  },
  chanels: 'Chanel',
};

test(`<ColorDisplay /> with right formated ${formated}`, (t) => {
  // ColorDisplay is wrapped inside copyToClipboard hoc, so it needs to be shallowed one more time
  const wrapper = shallow(<ColorDisplay colorValue={formated} />).find('ColorDisplay').shallow();

  const display = wrapper.find(selectors.display);
  const hexContainer = wrapper.find(selectors.hexContainer);
  const chanels = wrapper.find(selectors.chanels);
  const icon = wrapper.find(selectors.icon.base);

  // Hex color display tests
  t.equal(getBackgound(display), formated, 'Expected to set backgroundColor style prop');
  t.equal(hexContainer.text(), formated, 'Expected to display formated hex value');

  // Icon color test
  t.equal(icon.hasClass(selectors.icon.dark), true, 'Expected icon to be dark on light background');

  // Color chanels tests
  t.equal(chanels.length, 3, 'Expected three color chanels to render');
  t.deepEqual(
    chanels.map((chanel) => chanel.prop('value')),
    [255, 255, 255],
    'Expected to split color into rgb'
  );

  t.end();
});

test('<ColorDisplay /> with unformated value', (t) => {
  const wrapper = shallow(<ColorDisplay colorValue={unformated} />).find('ColorDisplay').shallow();

  const display = wrapper.find(selectors.display);
  const hexContainer = wrapper.find(selectors.hexContainer);

  // Test only for right hex format on my own risk
  t.equal(getBackgound(display), formated, 'Expected to set formated color as backgroundColor');
  t.equal(hexContainer.text(), formated, 'Expected to display formated hex value');

  t.end();
});

test('<ColorDisplay /> throw error without prop', (t) => {
  t.throws(
    () => shallow(<ColorDisplay />),
    'copyToClipboard hasn\'t recieved prop colorValue',
    'Expected to throw an error if colorValue prop was not passed'
  );

  t.end();
});
