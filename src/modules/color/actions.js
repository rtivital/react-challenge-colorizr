import { createAction } from 'redux-actions';
import types from './types';

export default {
  setLeadColor: createAction(types.SET_LEAD_COLOR),
  setMixedColor: createAction(types.SET_MIXED_COLOR),
};
