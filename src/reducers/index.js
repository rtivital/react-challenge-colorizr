import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import color from './colorsReducer';

export default combineReducers({ routing, color });
