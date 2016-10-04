import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as color } from './colorModule';

export default combineReducers({ routing, color });

export { actions as colorActions } from './colorModule';
