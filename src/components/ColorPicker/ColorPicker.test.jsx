import React from 'react';
import test from 'tape-catch';
import { shallow } from 'enzyme';
import { ColorPicker } from 'components';

test('<ColorPicker /> render', (t) => {
  let onChangeTest = '#000';

  const wrapper = shallow(<ColorPicker onChange={(color) => { onChangeTest = color; }} />);
  const ColorPickerComponent = wrapper.find('ColorPicker');

  // Default prop test
  t.equal(wrapper.state('currentColor'), '#000', '#000 is a default color');

  // Simulation of onDrag event of third party ColorPicker component
  // test state changes and onChange callback calls
  ColorPickerComponent.simulate('drag', '#444');
  t.equal(wrapper.state('currentColor'), '#444', '#444 is a set as color');
  t.equal(onChangeTest, '#444', 'Handles onChange function');

  t.end();
});
