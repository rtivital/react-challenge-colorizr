import React, { Component, PropTypes } from 'react';
import color from 'color';
import { v4 } from 'node-uuid';
import { copyToClipboard } from 'app/hocs';

const Chanel = ({ value, name }) => (
  <div className="chanel">
    <span className="chanel__name">{name.toUpperCase()}</span>
    <span className="chanel__value">{value}</span>
  </div>
);

Chanel.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

@copyToClipboard({ className: 'color-display__clipboard', value: 'colorValue' })
export default class ColorDisplay extends Component {
  static propTypes = {
    colorValue: PropTypes.string.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.colorValue !== nextProps.colorValue;
  }

  render() {
    const transformedColor = color(this.props.colorValue);
    const hex = transformedColor.hexString();
    const rgb = transformedColor.rgb();

    const chanels = Object.keys(rgb).map(
      chanel => <Chanel value={rgb[chanel]} name={chanel} key={v4()} />
    );

    return (
      <div className="color-display">
        <div className="color-display__display" style={{ backgroundColor: hex }} />
        <div className="color-display__chanels">{chanels}</div>
        <div className="color-display__hex">
          <span className="color-display__hex-name">HEX:</span>
          <span className="color-display__hex-value">{hex}</span>
        </div>
      </div>
    );
  }
}
