import React from 'react';
import { render } from 'react-dom';

// Router things
import { browserHistory, hashHistory } from 'react-router';
import AppRouter from 'app/routes';

// Redux things
import { Provider } from 'react-redux';
import configureStore from 'app/store';

// React Fastclick removes 400ms delay on touch devices
// https://github.com/JakeSidSmith/react-fastclick
import 'react-fastclick';

import 'app/styles/index.scss';

const store = configureStore();

// Use hashHistory while deploying on gh-pages otherwize prefer browserHistory
const history = process.env.BUILD === 'pages' ? hashHistory : browserHistory;

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('app')
);
