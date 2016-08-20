import React, { PropTypes } from 'react';
import color from 'color';

const ColorDisplay = ({ colorValue }) => {
  const transformedColor = color(colorValue);
  const hex = transformedColor.hexString();

  return (
    <div className="color-display" style={{ backgroundColor: hex }}>
      Color display
    </div>
  );
};

ColorDisplay.propTypes = {
  colorValue: PropTypes.string.isRequired,
};

export default ColorDisplay;
