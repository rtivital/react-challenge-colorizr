import React, { Component } from 'react';
import cx from 'classnames';
import extend from 'extend';
import Clipboard from 'react-copy-to-clipboard';
import { Button } from 'app/ui';

const defaultSettings = {
  text: 'Copy',
  success: 'Copied',
  value: null,
};

const copyToClipboard = (settings) => ComposedComponent => {
  const componentSettings = extend({}, defaultSettings, settings);
  if (!componentSettings.value) {
    throw new Error('value to copy was not provided to copyToClipboard hoc');
  }

  return class extends Component {
    state = { copied: false }
    timeout = null

    handleCopy = () => {
      if (this.timeout) { clearTimeout(this.timeout); }
      this.timeout = setTimeout(() => this.setState({ copied: false }), 2000);
      this.setState({ copied: true });
    }

    render() {
      const { value } = componentSettings;

      if (!Object.prototype.hasOwnProperty.call(this.props, value)) {
        throw new Error(`copyToClipboard hasn't recieved prop ${value}`);
      }

      const buttonTheme = this.state.copied ? 'white' : 'green';
      const buttonClassName = cx('clipboard__button', componentSettings.buttonClassName);
      const wrapperClassName = cx('clipboard', componentSettings.className);
      const buttonText = !this.state.copied ? componentSettings.text : componentSettings.success;

      return (
        <div className={wrapperClassName}>
          <ComposedComponent {...this.props} />
          <Clipboard text={this.props[value]} onCopy={this.handleCopy}>
            <Button theme={buttonTheme} className={buttonClassName}>{buttonText}</Button>
          </Clipboard>
        </div>
      );
    }
  };
};

export default copyToClipboard;
