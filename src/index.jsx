import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'react-fastclick';

import configureStore from './store';
import AppRouter from './routes';
import './styles/index.scss';

const store = configureStore();

// Minification process will remove browser or hash history depending on build type
/* eslint-disable global-require */
if (process.env.BUILD === 'pages') {
  // hashHistory will be used while deploying on gh-pages
  const hashHistory = require('react-router/lib/hashHistory');

  render(
    <Provider store={store}>
      <AppRouter history={hashHistory} />
    </Provider>,
    document.getElementById('app')
  );
} else {
  // browserHistory will be used for any other builds
  const browserHistory = require('react-router/lib/browserHistory');

  render(
    <Provider store={store}>
      <AppRouter history={browserHistory} />
    </Provider>,
    document.getElementById('app')
  );
}
