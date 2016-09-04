import { handleActions } from 'redux-actions';
import { colorActions } from 'app/actions';
import { isHex, prefixHex } from 'app/lib';

const initialState = {
  lead: '#0c93d2',
  mixer: '#f5f',
};

export default handleActions({
  [colorActions.setLeadColor](state, { payload }) {
    if (!isHex(payload)) { return state; }
    return { ...state, lead: prefixHex(payload) };
  },
}, initialState);
