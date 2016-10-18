import React, { Component, PropTypes } from 'react';
import Clipboard from 'react-copy-to-clipboard';
import { block } from 'rbem';

import { Colorizr } from 'lib';
import { Icon, glyphs, Button, ButtonWithIcon } from 'ui';
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
    const component = block('color-display');
    const transformedColor = new Colorizr(this.props.colorValue);
    const hex = transformedColor.hex();
    const rgb = transformedColor.clone().color;

    const chanels = Object.keys(rgb).map(
      (chanel, index) => <Chanel value={rgb[chanel]} name={chanel} key={`chanel-${chanel}-${index}`} />
    );

    const { copied } = this.state;
    const iconTheme = transformedColor.luminosity() >= 50 ? 'dark' : 'light';
    const buttonTheme = copied ? 'green' : 'white';
    const buttonText = copied ? 'Copied' : 'Copy HEX';
    const buttonGlyph = copied ? 'tick' : 'copy';

    return (
      <div className={component()}>
        <Button className={component('add')}>
          <Icon glyph={glyphs.add} className={component('add-icon')}>
            Add
          </Icon>
        </Button>
        <div className={component('display')} style={{ backgroundColor: hex }}>
          <span className={component('icon')}>
            <Icon glyph={glyphs.view} theme={iconTheme} />
          </span>
        </div>
        {!this.props.hideInfo && (
          <div className={component('info')}>
            <div className={component('chanels')}>{chanels}</div>
            <div className={component('hex')}>
              <span className={component('hex-name')}>HEX:</span>
              <span className={component('hex-value')}>{hex}</span>
            </div>
            <Clipboard text={hex} onCopy={this.handleCopy}>
              <ButtonWithIcon
                className={component('clipboard')}
                theme={buttonTheme}
                glyph={buttonGlyph}
              >
                {buttonText}
              </ButtonWithIcon>
            </Clipboard>
          </div>
        )}
      </div>
    );
  }
}
