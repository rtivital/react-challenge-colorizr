import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { debounce } from 'lodash';

import { updateWithQuery } from 'hocs';
import { ColorDisplayGroup } from 'components';
import { colorActions } from 'modules';
import { hex } from 'lib';

@updateWithQuery('mixer', colorActions.setMixedColor)
@connect(state => ({
  mixer: state.get('color').get('mixer'),
  colors: state.get('color').get('mixedGroup').toArray(),
}), { ...colorActions, replace })
export default class MixedGroup extends PureComponent {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    mixer: PropTypes.string.isRequired,
    replace: PropTypes.func.isRequired,
    setMixedColor: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }

  handleChange = debounce((colorValue) => {
    if (hex.isHex(colorValue)) {
      this.props.replace({
        pathname: this.props.location.pathname,
        query: { mixer: hex.unprefixHex(colorValue) },
      });
    }

    this.props.setMixedColor(hex.prefixHex(colorValue));
  }, 50)

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
