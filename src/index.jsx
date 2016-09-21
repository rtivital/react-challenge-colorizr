import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory, browserHistory } from 'react-router';

import 'react-fastclick';

import configureStore from './store';
import AppRouter from './routes';
import './styles/index.scss';

const store = configureStore();
const history = process.env.BUILD === 'pages' ? hashHistory : browserHistory;
const appHistory = syncHistoryWithStore(history, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});

render(
  <Provider store={store}>
    <AppRouter history={appHistory} />
  </Provider>,
  document.getElementById('app')
);
