import { handleActions } from 'redux-actions';
import types from './types';

const initialState = {
  error: false,
  loading: false,
  data: [],
};

export default handleActions({
  [types.REQUEST_START](state) {
    return { ...state, loading: true, error: false };
  },

  [types.REQUEST_SUCCESS](state, { payload }) {
    return { loading: false, error: false, data: payload };
  },

  [types.REQUEST_ERROR](state, { payload }) {
    return { ...state, loading: false, error: payload };
  },
}, initialState);
