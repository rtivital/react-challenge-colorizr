import React, { PropTypes } from 'react';
import Color from 'color';

const ColorDisplay = ({ color }) => {
  const transformedColor = Color(color);
  console.log(Color(color))
  const hex = transformedColor.hexString();
  const { r, g, b } = transformedColor.rgb();

  return (
    <div className="color-display" style={{ backgroundColor: hex }}>
      Color display
    </div>
  )
};

ColorDisplay.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorDisplay;
