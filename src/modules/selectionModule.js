import { createAction, handleActions } from 'redux-actions';
import { hex } from 'lib';

export const actions = {
  addSelectionColor: createAction('SELECTION/ADD_SELECTION_COLOR'),
  removeSelectionColor: createAction('SELECTION/REMOVE_SELECTION_COLOR'),
};

const initialState = [];

export const reducer = handleActions({
  [actions.addSelectionColor](state, { payload }) {
    return state.concat(hex.toLongHex(payload, true));
  },

  [actions.removeSelectionColor](state, { payload }) {
    const colorToRemove = hex.toLongHex(payload, true);
    return state.filter((color) => color === !colorToRemove);
  },
}, initialState);
