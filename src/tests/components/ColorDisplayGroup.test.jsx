import React from 'react';
import test from 'tape-catch';
import { shallow } from 'enzyme';
import { ColorDisplayGroup, ColorDisplay } from 'components';
import { Checkbox } from 'ui';

const colors = ['#fff', '#ccc', 'DDD', 'EEE', '46fe9d', '09f53c'];

test('<ColorDisplayGroup /> render', (t) => {
  const wrapper = shallow(<ColorDisplayGroup colors={colors} />);
  const displays = wrapper.find(ColorDisplay);
  const checkboxes = wrapper.find(Checkbox);
  const initialState = wrapper.state();

  // trigger info and gradient toggle
  checkboxes.map((checkbox) => checkbox.simulate('change'));
  const simulatedState = wrapper.state();

  t.equal(
    displays.length, colors.length,
    `Expected to render ${colors.length} displays, instead got ${displays.length}`
  );


  t.equal(
    initialState.gradient, !simulatedState.gradient,
    'Expected to toggle gradient with checkbox onChange event'
  );

  t.equal(
    initialState.info, !simulatedState.info,
    'Expected to toggle displays info with checkbox onChange event'
  );

  t.end();
});
