import React, { Component, PropTypes } from 'react';
import ColorPickerComponent from 'react-color-picker';
import { ColorDisplay } from 'app/components/ColorDisplay';
import 'react-color-picker/index.css';

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

        <ColorDisplay colorValue={this.state.currentColor} />
      </div>
    );
  }
}
