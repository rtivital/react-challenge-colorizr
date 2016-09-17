import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ColorDisplayGroup } from 'components';

@connect(state => ({ mixer: state.color.mixer, colors: state.color.mixedGroup }))
export default class MixedGroup extends PureComponent {
  static propTypes = {
    colors: PropTypes.array.isRequired,
  }

  render() {
    return (
      <ColorDisplayGroup
        title={`Mixed with ${this.props.mixer}`}
        colors={this.props.colors}
      />
    );
  }
}
