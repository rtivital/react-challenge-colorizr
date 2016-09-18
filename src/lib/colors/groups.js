import { Colorizr } from 'lib';

export function getLuminosityGroup(value) {
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

export function getMixedGroup(value, mixer) {
  const color = new Colorizr(value);
  const colorToMix = new Colorizr(mixer);
  const mixed = [];

  for (let i = 0; i < 10; i++) {
    mixed.push(color.clone().mix(colorToMix, i * 10).hex());
  }

  return mixed;
}
