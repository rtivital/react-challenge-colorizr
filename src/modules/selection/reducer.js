import { handleActions } from 'redux-actions';
import { hex } from 'lib';
import types from './types';

const initialState = [];

export default handleActions({
  [types.ADD_SELECTION_COLOR](state, { payload }) {
    return state.concat(hex.toLongHex(payload, true));
  },

  [types.REMOVE_SELECTION_COLOR](state, { payload }) {
    const colorToRemove = hex.toLongHex(payload, true);
    return state.filter((color) => color === !colorToRemove);
  },
}, initialState);
