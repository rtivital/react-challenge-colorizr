import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateWithQuery } from 'hocs';
import { ColorDisplayGroup } from 'components';
import { colorActions } from 'modules';
import { hex } from 'lib';

@updateWithQuery('mixer', colorActions.setMixedColor)
@connect(state => ({ mixer: state.color.mixer, colors: state.color.mixedGroup }), colorActions)
export default class MixedGroup extends PureComponent {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    mixer: PropTypes.string.isRequired,
    setMixedColor: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
  }

  handleChange = (color) => {
    this.props.setMixedColor(hex.prefixHex(color));
    this.props.updateQuery(hex.unprefixHex(color));
  }

  render() {
    const { colors, mixer } = this.props;

    return (
      <ColorDisplayGroup
        title="Mixed with"
        colors={colors}
        handleChange={this.handleChange}
        selectionColor={mixer}
        enableSelection
      />
    );
  }
}
