import { createAction } from 'redux-actions';
import axios from 'axios';
import types from './types';

const start = createAction(types.REQUEST_START);
const success = createAction(types.REQUEST_SUCCESS);
const error = createAction(types.REQUEST_ERROR);

export default {
  fetchPresets() {
    return (dispatch) => {
      dispatch(start());

      axios
        .get('./presets.json')
        .then(response => dispatch(success(response.data)))
        .catch(requestError => dispatch(error(requestError)));
    };
  },
};
