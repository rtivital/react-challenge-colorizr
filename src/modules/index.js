import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as color } from './colorModule';
import { reducer as selection } from './selectionModule';

export default combineReducers({ routing, color });

export { actions as colorActions } from './colorModule';
