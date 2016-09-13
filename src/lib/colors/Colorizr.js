import assignStaticPropsToClass from '../object/assignStaticToClass';
import * as hex from './hex';
import { isSplittedColor, convertSplittedToObject } from './splitted';

@assignStaticPropsToClass(hex)
export default class Colorizr {
  constructor(color) {
    const isHexString = hex.isHex(color);
    const isSplitted = isSplittedColor(color);

    // @TODO add rgb and rgba color validations
    if (!isHexString && !isSplitted) {
      throw new Error(`Recieved value ${color} is not a valid color`);
    }

    this.color = isSplitted
      ? convertSplittedToObject(color)
      : hex.splitHex(color, 'object');
  }

  clone() {
    return new Colorizr(this.color);
  }
}
