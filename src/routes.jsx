import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { IndexPage, ExportPage, ExplorePage } from 'pages';
import { AppContainer } from 'components';

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
