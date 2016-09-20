import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router/lib';

const updateWithQuery = (queryParam, action) => ComposedComponent =>
@withRouter
@connect()
class UpdateWithQuery extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (typeof action === 'function' && typeof queryParam === 'string') {
      this.props.dispatch(
        action(this.props.location.query[queryParam])
      );
    }
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};

export default updateWithQuery;
