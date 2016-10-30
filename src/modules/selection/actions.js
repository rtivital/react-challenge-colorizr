import { createAction } from 'redux-actions';
import types from './types';

export default {
  addSelectionColor: createAction(types.ADD_SELECTION_COLOR),
  removeSelectionColor: createAction(types.REMOVE_SELECTION_COLOR),
};
