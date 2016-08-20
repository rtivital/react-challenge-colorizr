import React, { PropTypes } from 'react';
import ColorPickerComponent from 'react-color-picker';
import 'react-color-picker/index.css';

const ColorPicker = ({ defaultColor, onChange }) => (
  <div className="color-picker">
    <ColorPickerComponent
      onDrag={onChange}
      defaultColor={defaultColor}
      saturationWidth={300}
      hueWidth={40}
    />
  </div>
);

ColorPicker.propTypes = {
  defaultColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
