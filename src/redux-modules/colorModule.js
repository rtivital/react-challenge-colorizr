import { createAction, handleActions } from 'redux-actions';
import { hex, groups } from 'lib';

export const actions = {
  setLeadColor: createAction('COLOR/SET_LEAD_COLOR'),
  setMixedColor: createAction('COLOR/SET_MIXED_COLOR'),
};

const INITIAL_LEAD_COLOR = '#0C93D2';
const INITIAL_MIXED_COLOR = '#1F6CA9';

const initialState = {
  lead: INITIAL_LEAD_COLOR,
  mixer: INITIAL_MIXED_COLOR,
  luminosityGroup: groups.getLuminosityGroup(INITIAL_LEAD_COLOR),
  mixedGroup: groups.getMixedGroup(INITIAL_LEAD_COLOR, INITIAL_MIXED_COLOR),
};

export const reducer = handleActions({
  [actions.setLeadColor](state, { payload }) {
    if (!hex.isHex(payload)) { return state; }
    return {
      ...state,
      lead: hex.prefixHex(payload),
      luminosityGroup: groups.getLuminosityGroup(payload),
      mixedGroup: groups.getMixedGroup(payload, state.mixer),
    };
  },

  [actions.setMixedColor](state, { payload }) {
    if (!hex.isHex(payload)) { return state; }
    return {
      ...state,
      mixer: hex.prefixHex(payload),
      mixedGroup: groups.getMixedGroup(state.lead, payload),
    };
  },
}, initialState);
