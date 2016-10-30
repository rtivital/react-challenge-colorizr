import React, { PropTypes } from 'react';
import { Paginator } from 'components';
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
    <Paginator className="presets__paginator">
      {presets}
    </Paginator>
  );
};

Presets.propTypes = {
  data: PropTypes.arrayOf(PrestPropType).isRequired,
};

export default Presets;
