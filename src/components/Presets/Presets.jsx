import React, { PropTypes } from 'react';
import './presets.scss';

const PrestPropType = PropTypes.arrayOf(PropTypes.string);

const Preset = ({ data, ...others }) => {
  const colors = data.map((color, index) => (
    <button
      {...others}
      className="preset__item"
      style={{ backgroundColor: color }}
      key={`${color}-${index}`}
    />
  ));

  return (
    <div className="preset">{colors}</div>
  );
};

Preset.propTypes = {
  data: PrestPropType.isRequired,
};

const Presets = ({ data, ...others }) => {
  const presets = data.map(
    (preset, index) => <Preset data={preset} key={`preset-${index}`} {...others} />
  );

  return (
    <div className="presets-group">{presets}</div>
  );
};

Presets.propTypes = {
  data: PropTypes.arrayOf(PrestPropType).isRequired,
};

export default Presets;
