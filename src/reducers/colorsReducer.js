import { handleActions } from 'redux-actions';

const initialState = {
  lead: '#ccc',
  mixer: '#f5f',
};

export default handleActions({
  SET_LEAD_COLOR(state, { payload }) {
    if (!payload) { return state; }
    return { ...state, lead: payload };
  },
}, initialState);
