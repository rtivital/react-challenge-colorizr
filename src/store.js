import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import rootReducer from 'app/reducers';

const middlewares = [
  thunkMiddleware,
  multiMiddleware,
];

const configureStore = initialState => {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};

export default configureStore;
