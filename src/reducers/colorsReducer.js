import { handleActions } from 'redux-actions';
import { validateHex } from 'app/lib';

const initialState = {
  lead: '#ccc',
  mixer: '#f5f',
};

export default handleActions({
  SET_LEAD_COLOR(state, { payload }) {
    if (!validateHex(payload)) { return state; }
    return { ...state, lead: payload };
  },
}, initialState);
