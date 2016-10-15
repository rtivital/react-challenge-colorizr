import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { ColorPicker } from 'components';
import { colorActions } from 'redux-modules';
import { updateWithQuery } from 'hocs';
import { hex } from 'lib';

@updateWithQuery('lead', colorActions.setLeadColor)
@connect(state => ({ color: state.color.lead }), colorActions)
export default class ColorPickerContainer extends PureComponent {
  static propTypes = {
    color(props, propName, componentName) {
      if (!hex.isHex(props[propName])) {
        return new Error(`${componentName} expected to recieve a valid hex value, shame`);
      }
    },
    setLeadColor: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
  }

  handleChange = (color) => {
    this.props.setLeadColor(hex.prefixHex(color));
    this.props.updateQuery(hex.unprefixHex(color));
  }

  render() {
    return (
      <ColorPicker
        defaultColor={this.props.color}
        onChange={this.handleChange}
      />
    );
  }
}
