import React, { PropTypes } from 'react';
import './color-selection.scss';

const ColorSelectionSample = ({ color }) => (
  <div className="color-selection__sample" style={{ backgroundColor: color }} />
);

ColorSelectionSample.propTypes = {
  color: PropTypes.string.isRequired,
};

const ColorSelection = ({ colors }) => {
  const samples = colors.map(
    (color, index) => <ColorSelectionSample color={color} key={`${index}-${color}`} />
  );

  return (
    <div className="color-selection">
      <h2 className="color-selection__title">Color Selection</h2>
      <div className="color-selection__samples">{samples}</div>
    </div>
  );
};

ColorSelection.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorSelection;
