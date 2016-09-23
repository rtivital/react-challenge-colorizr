import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { gradient } from 'lib';
import { Button, Checkbox } from 'ui';
import { ColorDisplay } from 'components';
import ColorSelectionControl from './ColorSelectionControl';
import './color-display-group.scss';

export default class ColorDisplayGroup extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    enableSelection: PropTypes.bool,
    selectionColor: PropTypes.string,
    handleChange: PropTypes.func,
  }

  state = {
    gradient: false,
    info: false,
  }

  toggleGradient = () => {
    this.setState({ gradient: !this.state.gradient });
  }

  toggleInfo = () => {
    this.setState({ info: !this.state.info });
  }

  toggleMixer = () => {
    this.setState({ showColorPicker: !this.state.mixer });
  }

  render() {
    const { colors } = this.props;

    const colorDisplays = colors.map(
      (color, index) => <ColorDisplay colorValue={color} hideInfo={!this.state.info} key={`${color}-${index}`} />
    );

    const displaysClassName = cx('color-display-group__displays', {
      'color-display-group__displays--gradient': this.state.gradient,
    });

    return (
      <div className="color-display-group">
        <div className="color-display-group__header">
          <h3 className="color-display-group__title">{this.props.title}</h3>

          {do {
            if (this.props.enableSelection) {
              <ColorSelectionControl
                selectionColor={this.props.selectionColor}
                onChange={this.props.handleChange}
              />;
            }
          }}
        </div>
        <div
          className={displaysClassName}
          style={{ backgroundImage: gradient.createGradient(colors) }}
        >
          {colorDisplays}
        </div>
        <div className="color-display-group__controls">
          <Checkbox
            className="color-display-group__control"
            label="Show Info"
            checked={this.state.info}
            onChange={this.toggleInfo}
          />
          <Checkbox
            className="color-display-group__control"
            label="Gradient"
            checked={this.state.gradient}
            onChange={this.toggleGradient}
          />
          <Button className="color-display-group__control">Select All</Button>
          <Button className="color-display-group__control" theme="red">Remove All</Button>
        </div>
      </div>
    );
  }
}
