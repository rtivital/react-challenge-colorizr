import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import { routerMiddleware } from 'react-router-redux';
import { Map } from 'immutable';
import rootReducer from 'modules';

// create routing actions for hashHistory while deploying on gh-pages
const routingMiddleware = routerMiddleware(
  process.env.BUILD === 'pages'
  ? require('react-router/lib/hashHistory')
  : require('react-router/lib/browserHistory')
);

const middlewares = [
  thunkMiddleware,
  multiMiddleware,
  routingMiddleware,
];

const configureStore = (initialState = new Map({})) => {
  // Prevent redux devTools initialization in production
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV === 'development'
      ? window.devToolsExtension()
      : f => f
  ));

  return store;
};

export default configureStore;
