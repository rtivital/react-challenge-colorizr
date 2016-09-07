import React from 'react';
import test from 'tape-catch';
import { shallow } from 'enzyme';
import Clipboard from 'react-copy-to-clipboard';
import { ColorDisplay } from 'app/components';

const formated = '#FFFFFF';
const unformated = '#fff';

const getBackgound = (shallowed) => shallowed.prop('style').backgroundColor;

const selectors = {
  display: '.color-display__display',
  hexContainer: '.color-display__hex-value',
  chanels: 'Chanel',
};

test(`<ColorDisplay /> with right formated ${formated}`, (t) => {
  // ColorDisplay is wrapped inside copyToClipboard hoc, so it needs to be shallowed one more time
  const wrapper = shallow(<ColorDisplay colorValue={formated} />);

  const display = wrapper.find(selectors.display);
  const hexContainer = wrapper.find(selectors.hexContainer);
  const chanels = wrapper.find(selectors.chanels);

  // Hex color display tests
  t.equal(getBackgound(display), formated, 'Expected to set backgroundColor style prop');
  t.equal(hexContainer.text(), formated, 'Expected to display formated hex value');

  // Color chanels tests
  t.equal(chanels.length, 3, 'Expected three color chanels to render');
  t.deepEqual(
    chanels.map((chanel) => chanel.prop('value')),
    [255, 255, 255],
    'Expected to split color into rgb'
  );

  // clipboard test
  wrapper.find(Clipboard).simulate('copy');
  t.equal(wrapper.state('copied'), true, 'Expected to copy value to clipboard');

  t.end();
});

test('<ColorDisplay /> with unformated value', (t) => {
  const wrapper = shallow(<ColorDisplay colorValue={unformated} />);

  const display = wrapper.find(selectors.display);
  const hexContainer = wrapper.find(selectors.hexContainer);

  // Test only for right hex format on my own risk
  t.equal(getBackgound(display), formated, 'Expected to set formated color as backgroundColor');
  t.equal(hexContainer.text(), formated, 'Expected to display formated hex value');

  t.end();
});
