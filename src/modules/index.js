import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Reducers
import explore from './explore/reducer';
import selection from './selection/reducer';
import color from './color/reducer';

// Actions
export colorActions from './color/actions';
export selectionActions from './selection/actions';
export exploreActions from './explore/actions';

// Root Reducer
export default combineReducers({ routing, color, selection, explore });
