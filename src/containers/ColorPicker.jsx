import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { replace } from 'react-router-redux';
import { ColorPicker } from 'app/components/ColorPicker';
import { colorActions } from 'app/actions';
import { updateWithQuery } from 'app/hocs';
import { isHex, unprefixHex, prefixHex } from 'app/lib';

@updateWithQuery('lead', colorActions.setLeadColor)
@connect(state => ({ color: state.color.lead }), { ...colorActions, replace })
export default class ColorPickerContainer extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
    setLeadColor: PropTypes.func.isRequired,
  }

  handleChange = debounce((colorValue) => {
    if (isHex(colorValue)) {
      this.props.replace({
        pathname: this.props.location.pathname,
        query: { lead: unprefixHex(colorValue) },
      });
    }

    this.props.setLeadColor(prefixHex(colorValue));
  }, 100)

  render() {
    return (
      <ColorPicker
        defaultColor={this.props.color}
        onChange={this.handleChange}
      />
    );
  }
}
