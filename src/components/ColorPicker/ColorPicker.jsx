import React, { PropTypes } from 'react';
import ColorPickerComponent from 'react-color-picker';
import 'react-color-picker/index.css';

const ColorPicker = ({ defaultColor }) => (
  <div className="color-picker">
    <ColorPickerComponent defaultColor={defaultColor} saturationWidth={300} hueWidth={40} />
  </div>
);

export default ColorPicker;
