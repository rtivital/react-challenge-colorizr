import { createAction, handleActions } from 'redux-actions';
import color from 'color';
import { hex } from 'app/lib';

export const actions = {
  setLeadColor: createAction('SET_LEAD_COLOR'),
};

const initialState = {
  lead: '#0c93d2',
  mixer: '#f5f',
  luminosity: [],
};

export const reducer = handleActions({
  [actions.setLeadColor](state, { payload }) {
    if (!hex.isHex(payload)) { return state; }
    const value = color(hex.prefixHex(payload));
    const luminosity = value.luminosity();
    const lightColors = parseInt(luminosity * 10, 10);
    const darkColors = 10 - lightColors;
    const darkened = [];
    const lightened = [];

    for (let i = 0; i < lightColors; i += 1) {
      lightened.push(value.clone().lighten(i * 0.1).hexString());
    }

    for (let i = 0; i < darkColors; i += 1) {
      darkened.push(value.clone().darken(i * 0.1).hexString());
    }

    const lum = lightened.reverse().concat(darkened);

    return { ...state, lead: hex.prefixHex(payload), luminosity: lum };
  },
}, initialState);
