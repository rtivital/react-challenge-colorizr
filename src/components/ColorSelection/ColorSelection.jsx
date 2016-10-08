import React, { PropTypes } from 'react';
import { block } from 'rbem';
import { hex } from 'lib';
import './color-selection.scss';

const component = block('color-selection');

const ColorSelectionSample = ({ color }) => {
  const value = hex.createLongHex(color, true).toUpperCase();
  return (
    <div className={component('sample')}>
      <div className={component('value')}>{value}</div>
      <div className={component('display')} style={{ backgroundColor: value }} />
    </div>
  );
};

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
