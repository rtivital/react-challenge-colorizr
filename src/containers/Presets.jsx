import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectionActions, exploreActions } from 'modules';
import { Presets } from 'components';

@connect(state => state.explore, { ...selectionActions, ...exploreActions })
export default class PresetsContainer extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fetchPresets: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.fetchPresets();
    }
  }

  render() {
    return (
      <Presets
        data={this.props.data}
      />
    );
  }
}
