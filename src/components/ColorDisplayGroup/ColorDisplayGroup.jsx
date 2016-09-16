import React, { Component, PropTypes } from 'react';
import { v4 } from 'node-uuid';
import cx from 'classnames';

import { Button, Checkbox } from 'ui';
import { ColorDisplay } from 'components';
import './color-display-group.scss';

function createGradient(colors) {
  let gradient = 'linear-gradient(to right,';
  const { length } = colors;

  colors.forEach((color, index) => {
    const percent = 100 * (index + 1) / length;
    gradient += `${color} ${percent}%,`;
  });

  gradient = gradient.slice(0, gradient.length - 1);
  gradient += ')';

  return gradient;
}

export default class ColorDisplayGroup extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
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

  render() {
    const { colors } = this.props;

    const colorDisplays = colors.map(
      (color) => <ColorDisplay colorValue={color} hideInfo={!this.state.info} key={v4()} />
    );

    const displaysClassName = cx('color-display-group__displays', {
      'color-display-group__displays--gradient': this.state.gradient,
    });

    return (
      <div className="color-display-group">
        <h3 className="color-display-group__title">{this.props.title}</h3>
        <div className={displaysClassName} style={{ backgroundImage: createGradient(colors) }}>
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
