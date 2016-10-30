import { handleActions } from 'redux-actions';
import { hex, groups } from 'lib';
import types from './types';


const INITIAL_LEAD_COLOR = '#0C93D2';
const INITIAL_MIXED_COLOR = '#0DF9C4';

const initialState = {
  lead: INITIAL_LEAD_COLOR,
  mixer: INITIAL_MIXED_COLOR,
  luminosityGroup: groups.getLuminosityGroup(INITIAL_LEAD_COLOR),
  mixedGroup: groups.getMixedGroup(INITIAL_LEAD_COLOR, INITIAL_MIXED_COLOR),
};


export default handleActions({
  [types.SET_LEAD_COLOR](state, { payload }) {
    if (!hex.isHex(payload)) { return state; }
    return {
      ...state,
      lead: hex.prefixHex(payload),
      luminosityGroup: groups.getLuminosityGroup(payload),
      mixedGroup: groups.getMixedGroup(payload, state.mixer),
    };
  },

  [types.SET_MIXED_COLOR](state, { payload }) {
    if (!hex.isHex(payload)) { return state; }
    return {
      ...state,
      mixer: hex.prefixHex(payload),
      mixedGroup: groups.getMixedGroup(state.lead, payload),
    };
  },
}, initialState);
