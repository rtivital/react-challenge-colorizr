import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ColorDisplayGroup } from 'components';

@connect(state => ({ colors: state.color.mixedGroup }))
export default class MixedGroup extends PureComponent {
  static propTypes = {
    colors: PropTypes.array.isRequired,
  }

  render() {
    return (
      <ColorDisplayGroup
        title="Darker and lighter"
        colors={this.props.colors}
      />
    );
  }
}
