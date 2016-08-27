import React, { Component, PropTypes } from 'react';
import cx from 'classNames';
import extend from 'extend';
import Clipboard from 'react-copy-to-clipboard';
import { Button } from 'app/ui';

const defaultSettings = {
  className: 'clipboard',
  buttonClassName: 'clipboard__button',
  value: null,
};

const copyToClipboard = (settings) => ComposedComponent => {
  const componentSettings = extend({}, defaultSettings, settings);
  if (!componentSettings.value) {
    throw new Error('value to copy was not provided to copyToClipboard hoc');
  }

  return function(props) {
    const { value, className, buttonClassName } = componentSettings;

    if (!props.hasOwnProperty(value)) {
      throw new Error(`copyToClipboard hasn't recieved prop ${value}`);
    }

    return (
      <div className={className}>
        <ComposedComponent {...props} />
        <Clipboard text={props[value]}>
          <Button className={buttonClassName}>Copy HEX</Button>
        </Clipboard>
      </div>
    )
  };
};

export default copyToClipboard;
