import { handleActions } from 'redux-actions';
import { isHex, prefixHex } from 'app/lib';
import color from 'color';

const initialState = {
  lead: '#ccc',
  mixer: '#f5f',
};

export default handleActions({
  SET_LEAD_COLOR(state, { payload }) {
    if (!isHex(payload)) { return state; }
    return { ...state, lead: prefixHex(payload) };
  },
}, initialState);
