import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'app/reducers';

// create routing actions for hashHistory while deploying on gh-pages
const routingMiddleware = routerMiddleware(
  process.env.BUILD === 'pages'
  ? require('react-router/lib/hashHistory')
  : require('react-router/lib/browserHistory')
);

// middlewares are required while store mocking during tests
export const middlewares = [
  thunkMiddleware,
  multiMiddleware,
  routingMiddleware,
];

const configureStore = initialState => {
  // Prevent redux devTools initialization in production
  if (process.env.NODE_ENV === 'development') {
    return createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  }

  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

export default configureStore;
