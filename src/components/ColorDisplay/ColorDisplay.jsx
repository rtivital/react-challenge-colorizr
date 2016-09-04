import React, { Component, PropTypes } from 'react';
import color from 'color';
import { v4 } from 'node-uuid';
import cx from 'classnames';
import { copyToClipboard } from 'app/hocs';
import { Icon, glyphs } from 'app/ui';
import './color-display.scss';

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

    const iconLuminosity = transformedColor.luminosity();
    const iconClassName = cx('color-display__icon', {
      'color-display__icon--dark': iconLuminosity >= 0.5,
      'color-display__icon--light': iconLuminosity < 0.5,
    });

    return (
      <div className="color-display">
        <div className="color-display__display" style={{ backgroundColor: hex }}>
          <span className={iconClassName}>
            <Icon glyph={glyphs.view} />
          </span>
        </div>
        <div className="color-display__chanels">{chanels}</div>
        <div className="color-display__hex">
          <span className="color-display__hex-name">HEX:</span>
          <span className="color-display__hex-value">{hex}</span>
        </div>
      </div>
    );
  }
}
