import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import browserHistory from 'react-router/lib/browserHistory';
import debounce from 'lodash.debounce';
import { replace } from 'react-router-redux';
import { ColorPicker } from 'app/components/ColorPicker';
import { colorActions } from 'app/actions';

@withRouter
@connect(state => ({ color: state.color.lead }), {...colorActions, replace})
export default class ColorPickerContainer extends Component {
  handleChange = debounce((colorValue) => {
    this.props.replace({ pathname: '/', query: { lead: colorValue } });
    this.props.setLeadColor(colorValue);
  }, 100)

  componentWillMount() {
    this.props.setLeadColor(this.props.location.query.lead);
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
