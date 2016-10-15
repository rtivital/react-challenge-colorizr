import React, { Component, PropTypes } from 'react';
import { block, applyModifiers } from 'rbem';
import { chunk } from 'lodash';

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
    const component = block('color-display-group');

    const { colors } = this.props;
    const chunks = chunk(colors, colors.length / 2);

    const colorsRows = chunks.map((colorsChunk, chunkIndex) => {
      const chunkContent = colorsChunk.map((color, index) => (
        <ColorDisplay
          colorValue={color}
          hideInfo={!this.state.info}
          key={`${color}-${index}`}
        />
      ));

      return (
        <div
          className={component('row')}
          style={{ backgroundImage: gradient.createGradient(colorsChunk) }}
          key={`${chunkIndex}-row`}
        >
          {chunkContent}
        </div>
      );
    });

    const displaysClassName = applyModifiers(component('displays'), {
      gradient: this.state.gradient,
    });

    return (
      <div className={component()}>
        <div className={component('header')}>
          <h3 className={component('title')}>{this.props.title}</h3>

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
          style={{ backgroundImage: gradient.createGradient(colors, 'left') }}
        >
          {colorsRows}
        </div>
        <div className={component('controls')}>
          <Checkbox
            className={component('control')}
            label="Show Info"
            checked={this.state.info}
            onChange={this.toggleInfo}
          />
          <Checkbox
            className={component('control')}
            label="Gradient"
            checked={this.state.gradient}
            onChange={this.toggleGradient}
          />
          <Button className={component('control')}>Select All</Button>
          <Button className={component('control')} theme="red">Remove All</Button>
        </div>
      </div>
    );
  }
}
