import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import { routerMiddleware } from 'react-router-redux';
import { throttle } from 'lodash';
import rootReducer from 'modules';

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

function loadState() {
  try {
    const serializedState = JSON.parse(localStorage.getItem('state'));
    if (serializedState === null) { return undefined; }
    return serializedState;
  } catch (e) {
    return undefined;
  }
}

function saveState(state) {
  try {
    // remove routing before saving: it ruins everything!
    const stateToSave = { ...state };
    delete stateToSave.routing;

    localStorage.setItem('state', JSON.stringify(stateToSave));
    return null;
  } catch (e) {
    return null;
  }
}

const configureStore = (initialState = loadState()) => {
  // Prevent redux devTools initialization in production
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV === 'development'
      ? window.devToolsExtension()
      : f => f
  ));

  // Save state to localStorage every second
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
