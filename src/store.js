import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import rootReducer from 'app/reducers';

const middlewares = [
  thunkMiddleware,
  multiMiddleware,
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
