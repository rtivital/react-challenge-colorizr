import { createAction, handleActions } from 'redux-actions';
import { Colorizr } from 'lib';

const INITIAL_LEAD_COLOR = '#0C93D2';
const INITIAL_MIXED_COLOR = '#1F6CA9';

function getLuminosityGroup(value) {
  const color = new Colorizr(value);

  const luminosity = parseInt(color.luminosity() / 10, 10);
  const lightened = [];
  const darkened = [];

  for (let ii = 1; ii <= 10 - luminosity; ii++) {
    lightened.push(color.clone().lighten(ii * 10).hex());
  }

  for (let ii = 1; ii <= luminosity; ii++) {
    darkened.push(color.clone().darken(ii * 10).hex());
  }

  return darkened.reverse().concat(color.hex()).concat(lightened.slice(1));
}

function getMixedGroup(value, mixer) {
  const color = new Colorizr(value);
  const colorToMix = new Colorizr(mixer);
  const mixed = [];

  for (let i = 0; i < 10; i++) {
    mixed.push(color.clone().mix(colorToMix, i * 10).hex());
  }

  return mixed;
}

export const actions = {
  setLeadColor: createAction('COLOR/SET_LEAD_COLOR'),
  setMixedColor: createAction('COLOR/SET_MIXED_COLOR'),
};

const initialState = {
  lead: INITIAL_LEAD_COLOR,
  mixer: INITIAL_MIXED_COLOR,
  luminosityGroup: getLuminosityGroup(INITIAL_LEAD_COLOR),
  mixedGroup: getMixedGroup(INITIAL_LEAD_COLOR, INITIAL_MIXED_COLOR),
};

export const reducer = handleActions({
  [actions.setLeadColor](state, { payload }) {
    if (!Colorizr.isHex(payload)) { return state; }
    return {
      ...state,
      lead: Colorizr.prefixHex(payload),
      luminosityGroup: getLuminosityGroup(payload),
      mixedGroup: getMixedGroup(payload, state.mixer),
    };
  },
}, initialState);
