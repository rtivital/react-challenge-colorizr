import React, { PropTypes } from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import { AppContainer, IndexPage, ExportPage, ExplorePage } from 'pages';

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
