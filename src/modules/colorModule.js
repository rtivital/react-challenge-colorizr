import { createAction, handleActions } from 'redux-actions';
import { Colorizr } from 'lib';

const INITIAL_LEAD_COLOR = '#0C93D2';
const INITIAL_MIXED_COLOR = '#1F6CA9';

function getLuminosityGroup(value) {
  const color = new Colorizr(value);
  const darkened = [];
  const lightened = [];
  let enableLight = true;
  let enableDark = true;

  for (let i = 1; i <= 5; i += 1) {
    const lightenedColor = color.clone().lighten(i * 10);
    const darkenedColor = color.clone().darken(i * 10);

    if (lightenedColor.luminosity() === 1) { enableLight = false; }
    if (darkenedColor.luminosity() === 0) { enableDark = false; }

    if (enableLight) { lightened.push(lightenedColor.hex()); }
    if (enableDark) { darkened.push(darkenedColor.hex()); }
  }

  for (let i = 1, l = 10 - (lightened.length + darkened.length); i <= l; i++) {
    if (enableLight) {
      const lightenedColor = color.clone().lighten((i + 5) * 10);
      lightened.push(lightenedColor.hex());
    }

    if (enableDark) {
      const darkenedColor = color.clone().darken((i + 5) * 10);
      darkened.push(darkenedColor.hex());
    }
  }

  return darkened.reverse().slice(1).concat(color.hex()).concat(lightened);
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
      luminosity: getLuminosityGroup(payload),
      mixedGroup: getMixedGroup(payload, state.mixer),
    };
  },
}, initialState);
