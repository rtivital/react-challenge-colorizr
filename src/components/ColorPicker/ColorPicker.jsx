import React, { Component, PropTypes } from 'react';
import ColorPickerComponent from 'react-color-picker';
import cx from 'classnames';

import { ColorDisplay } from 'components';
import './color-picker.scss';

export default class ColorPicker extends Component {
  static propTypes = {
    defaultColor: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    defaultColor: '#000',
    onChange: v => v,
  }

  state = { currentColor: this.props.defaultColor }

  handleColorSelection = (newColor) => {
    this.setState({ currentColor: newColor });
    this.props.onChange(newColor);
  }

  render() {
    return (
      <div className={cx('color-picker', this.props.className)}>
        <ColorPickerComponent
          onDrag={this.handleColorSelection}
          defaultColor={this.props.defaultColor}
          saturationWidth={300}
          hueWidth={40}
        />
        <div className="color-picker__display">
          <ColorDisplay colorValue={this.state.currentColor} />
        </div>
      </div>
    );
  }
}
