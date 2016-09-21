import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

export default handleActions({
  [LOCATION_CHANGE](state, { payload }) {
    return state.merge({ locationBeforeTransitions: payload });
  },
}, initialState);
