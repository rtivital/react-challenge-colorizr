import React from 'react';
import test from 'tape-catch';
import { shallow } from 'enzyme';
import { ColorDisplayGroup, ColorDisplay } from 'components';
import { Checkbox } from 'ui';

const colors = ['#fff', '#ccc', 'DDD', 'EEE', '46fe9d', '09f53c'];
const title = 'Darker and Lighter';

test('<ColorDisplayGroup /> render', (t) => {
  const wrapper = shallow(<ColorDisplayGroup colors={colors} title={title} />);
  const displays = wrapper.find(ColorDisplay);
  const checkboxes = wrapper.find(Checkbox);
  const initialState = wrapper.state();

  t.equal(
    wrapper.find('.color-display-group__title').text(), title,
    'Sets right title to component'
  );

  // trigger info and gradient toggle
  checkboxes.map((checkbox) => checkbox.simulate('change'));
  const simulatedState = wrapper.state();

  t.equal(displays.length, colors.length, `Renders ${colors.length} displays`);

  t.equal(
    initialState.gradient, !simulatedState.gradient,
    'Toggles gradient with checkbox onChange event'
  );

  t.equal(
    initialState.info, !simulatedState.info,
    'Toggles displays info with checkbox onChange event'
  );

  t.end();
});
