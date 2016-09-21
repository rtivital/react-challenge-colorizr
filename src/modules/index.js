import { combineReducers } from 'redux-immutable';
import { reducer as color } from './colorModule';
import routing from './routing';

export default combineReducers({ routing, color });

export { actions as colorActions } from './colorModule';
