import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { IndexPage, ExportPage, ExplorePage } from 'pages';
import { AppContainer } from 'components';

Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
  const components = [];
  function grabComponents(element) {
    if (element.props && element.props.component) {
      components.push(element.props.component);
    }
    if (element.props && element.props.children) {
      React.Children.forEach(element.props.children, grabComponents);
    }
  }
  grabComponents(nextProps.routes || nextProps.children);
  components.forEach(React.createElement); // force patching
};

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={IndexPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/export" component={ExportPage} />
    </Route>
  </Router>
);

AppRouter.propTypes = { history: PropTypes.object.isRequired };
export default AppRouter;
