import React, { Component, PropTypes } from 'react';
import { v4 } from 'node-uuid';
import ColorDisplay from './ColorDisplay';

export default class ColorDisplayGroup extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {}

  render() {
    const colorDisplays = this.props.colors.map(
      (color) => <ColorDisplay colorValue={color} hideInfo key={v4()} />
    );

    return (
      <div className="color-display-group">
        <h3 className="color-display-group__title">{this.props.title}</h3>
        <div className="color-display-group__displays">
          {colorDisplays}
        </div>
      </div>
    );
  }
}
