import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';

const updateWithQuery = (queryParam, action) => ComposedComponent =>
  @withRouter
  @connect()
  class UpdateWithQuery extends PureComponent {
    componentWillMount() {
      if (typeof action === 'function' && typeof queryParam === 'string') {
        this.props.dispatch(
          action(this.props.location.query[queryParam])
        );
      }
    }

    render() {
      return <ComposedComponent />
    }
  }

export default updateWithQuery;
