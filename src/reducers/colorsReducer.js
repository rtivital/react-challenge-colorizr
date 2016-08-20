import { handleActions } from 'redux-actions';

const initialState = {
  lead: '#ccc',
  mixer: '#f5f',
};

export default handleActions({
  SET_LEAD_COLOR(state, { payload }) {
    return { ...state, lead: payload };
  },
}, initialState);
