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

    const splittedColor = isSplitted
      ? convertSplittedToObject(color)
      : hex.splitHex(color, 'object');

    Object.keys(splittedColor).forEach((chanel) => {
      Object.defineProperty(this, chanel, {
        value: splittedColor[chanel],
        enumerable: true,
      });
    });
  }

  clone() {
    return new Colorizr(this);
  }
}
