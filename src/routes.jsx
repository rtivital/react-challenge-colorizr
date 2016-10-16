import React, { Children, PropTypes, createElement } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { IndexPage, ExportPage, ExplorePage } from 'pages';
import { AppContainer } from 'components';

class HotRouter extends Router {
  componentWillReceiveProps(nextProps) {
    const components = [];
    function grabComponents(element) {
      if (element.props && element.props.component) {
        components.push(element.props.component);
      }

      if (element.props && element.props.children) {
        Children.forEach(element.props.children, grabComponents);
      }
    }

    grabComponents(nextProps.routes || nextProps.children);
    components.forEach(createElement); // force patching
  }
}

const AppRouter = ({ history }) => (
  <HotRouter history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={IndexPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/export" component={ExportPage} />
    </Route>
  </HotRouter>
);

AppRouter.propTypes = { history: PropTypes.object.isRequired };
export default AppRouter;
