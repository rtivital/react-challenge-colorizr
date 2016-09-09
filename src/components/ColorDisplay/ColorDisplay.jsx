import React, { Component, PropTypes } from 'react';
import color from 'color';
import { v4 } from 'node-uuid';
import Clipboard from 'react-copy-to-clipboard';

import { Icon, glyphs, ButtonWithIcon } from 'app/ui';
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

export default class ColorDisplay extends Component {
  static propTypes = {
    colorValue: PropTypes.string.isRequired,
    hideInfo: PropTypes.bool,
  }

  static defaultProps = {
    hideInfo: false,
  }

  state = { copied: false }
  timeout = null

  handleCopy = () => {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => this.setState({ copied: false }), 2000);
    this.setState({ copied: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.colorValue !== nextProps.colorValue
      || this.state.copied !== nextState.hideInfo
    );
  }

  render() {
    const transformedColor = color(this.props.colorValue);
    const hex = transformedColor.hexString();
    const rgb = transformedColor.rgb();

    const chanels = Object.keys(rgb).map(
      chanel => <Chanel value={rgb[chanel]} name={chanel} key={v4()} />
    );

    const iconTheme = transformedColor.luminosity() >= 0.5 ? 'dark' : 'light';
    const buttonTheme = !this.state.copied ? 'white' : 'green';
    const buttonText = this.state.copied ? 'Copied' : 'Copy HEX';
    const buttonGlyph = !this.state.copied ? 'copy' : 'tick';

    return (
      <div className="color-display">
        <div className="color-display__display" style={{ backgroundColor: hex }}>
          <span className="color-display__icon">
            <Icon glyph={glyphs.view} theme={iconTheme} />
          </span>
        </div>
        {do {
          if (!this.props.hideInfo) {
            <div className="color-display__info">
              <div className="color-display__chanels">{chanels}</div>
              <div className="color-display__hex">
                <span className="color-display__hex-name">HEX:</span>
                <span className="color-display__hex-value">{hex}</span>
              </div>
              <Clipboard text={hex} onCopy={this.handleCopy}>
                <ButtonWithIcon
                  className="color-display__clipboard"
                  theme={buttonTheme}
                  glyph={buttonGlyph}
                >
                  {buttonText}
                </ButtonWithIcon>
              </Clipboard>
            </div>;
          }
        }}
      </div>
    );
  }
}
