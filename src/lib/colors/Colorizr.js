import assignStaticPropsToClass from '../object/assignStaticToClass';
import * as hex from './hex';
import * as splitted from './splitted';

@assignStaticPropsToClass(hex)
export default class Colorizr {
  constructor(color) {
    const isHexString = hex.isHex(color);
    const isSplitted = splitted.isSplittedColor(color);

    // @TODO add rgb and rgba color validations
    if (!isHexString && !isSplitted) {
      throw new Error(`Recieved value ${color} is not a valid color`);
    }

    this.color = isSplitted
      ? splitted.convertSplittedToObject(color)
      : hex.splitHex(color, 'object');
  }

  clone() {
    return new Colorizr(this.color);
  }

  darken(percent) {
    this.color = splitted.darken(this.color, percent);
    return this;
  }

  lighten(percent) {
    this.color = splitted.lighten(this.color, percent);
    return this;
  }

  mix(mixer, percent) {
    const colorToMix = mixer instanceof Colorizr ? mixer : new Colorizr(mixer);
    this.color = splitted.mix(this.color, colorToMix.color, percent);
    return this;
  }

  luminosity() {
    return splitted.getLuminosity(this.color);
  }

  hex() {
    return hex.mergeHex(this.color);
  }
}
