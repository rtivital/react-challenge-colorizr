import React, { Component, PropTypes } from 'react';
import ColorPickerComponent from 'react-color-picker';
import { ColorDisplay } from 'app/components';
import 'react-color-picker/index.css';
import './color-picker.scss';

export default class ColorPicker extends Component {
  static propTypes = {
    defaultColor: PropTypes.string,
    onChange: PropTypes.func,
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
      <div className="color-picker">
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
