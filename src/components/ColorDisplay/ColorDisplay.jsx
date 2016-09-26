import React, { Component, PropTypes } from 'react';
import Clipboard from 'react-copy-to-clipboard';

import { Colorizr } from 'lib';
import { Icon, glyphs, ButtonWithIcon } from 'ui';
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
    const transformedColor = new Colorizr(this.props.colorValue);
    const hex = transformedColor.hex();
    const rgb = transformedColor.clone().color;

    const chanels = Object.keys(rgb).map(
      (chanel, index) => <Chanel value={rgb[chanel]} name={chanel} key={`chanel-${chanel}-${index}`} />
    );

    const iconTheme = transformedColor.luminosity() >= 50 ? 'dark' : 'light';
    const buttonTheme = !this.state.copied ? 'white' : 'green';
    const buttonText = this.state.copied ? 'Copied' : 'Copy HEX';
    const buttonGlyph = !this.state.copied ? 'copy' : 'tick';

    return (
      <div className="color-display">
        <div className="color-display__wrapper">
          <div className="color-display__display" style={{ backgroundColor: hex }}>
            <span className="color-display__icon">
              <Icon glyph={glyphs.view} theme={iconTheme} />
            </span>
          </div>

          <button className="color-display__add">
            <Icon glyph={glyphs.add} theme="dark" />
          </button>
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
