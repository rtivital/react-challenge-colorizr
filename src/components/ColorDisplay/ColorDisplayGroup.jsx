import React, { Component, PropTypes } from 'react';
import { v4 } from 'node-uuid';
import ColorDisplay from './ColorDisplay';

export default class ColorDisplayGroup extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
  }

  state = {}

  render() {
    const colorDisplays = this.props.colors.map(
      (color) => <ColorDisplay colorValue={color} key={v4()} />
    );

    return (
      <div className="color-display-group">
        {colorDisplays}
      </div>
    );
  }
}
