import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { debounce } from 'lodash';

import { ColorPicker } from 'app/components';
import { colorActions } from 'app/modules';
import { updateWithQuery } from 'app/hocs';
import { hex } from 'app/lib';

@updateWithQuery('lead', colorActions.setLeadColor)
@connect(state => ({ color: state.color.lead }), { ...colorActions, replace })
export default class ColorPickerContainer extends Component {
  static propTypes = {
    color(props, propName, componentName) {
      if (!hex.isHex(props[propName])) {
        return new Error(`${componentName} expected to recieve a valid hex value, shame`);
      }
    },

    location: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
    setLeadColor: PropTypes.func.isRequired,
  }

  handleChange = debounce((colorValue) => {
    if (hex.isHex(colorValue)) {
      this.props.replace({
        pathname: this.props.location.pathname,
        query: { lead: hex.unprefixHex(colorValue) },
      });
    }

    this.props.setLeadColor(hex.prefixHex(colorValue));
  }, 50)

  render() {
    return (
      <ColorPicker
        defaultColor={this.props.color}
        onChange={this.handleChange}
      />
    );
  }
}
