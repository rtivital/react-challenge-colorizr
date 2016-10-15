import { browserHistory, hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'redux-modules';

// create routing actions for hashHistory while deploying on gh-pages
const routingMiddleware = routerMiddleware(
  process.env.BUILD === 'pages' ? hashHistory : browserHistory
);

const middlewares = [
  thunkMiddleware,
  routingMiddleware,
];

const configureStore = (initialState) => {
  // Prevent redux devTools initialization in production
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV === 'development'
      ? window.devToolsExtension()
      : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
