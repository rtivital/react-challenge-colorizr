import React, { PropTypes } from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import { IndexPage } from 'app/pages';

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={IndexPage} />
  </Router>
);

AppRouter.propTypes = { history: PropTypes.object.isRequired };
export default AppRouter;
