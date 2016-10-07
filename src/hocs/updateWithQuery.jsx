import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { replace } from 'react-router-redux';
import { debounce } from 'lodash';

const updateWithQuery = (queryParam, action) => ComposedComponent =>
@withRouter
@connect(null, { replace, action })
class UpdateWithQuery extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (typeof action === 'function' && typeof queryParam === 'string') {
      this.props.action(this.props.location.query[queryParam]);
    }
  }

  updateQuery = debounce((value) => {
    const { query } = this.props.location;
    const params = Object.assign({}, query, { [queryParam]: value });
    this.props.replace({ query: params });
  }, 200)

  render() {
    return <ComposedComponent {...this.props} updateQuery={this.updateQuery} />;
  }
};

export default updateWithQuery;
