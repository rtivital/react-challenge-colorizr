export function isUnprefixedHex(color) {
  return /(^[0-9A-F]{3}$)|(^[0-9A-F]{6}$)/i.test(color);
}

export function isPrefixedHex(color) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

export function isHex(color) {
  if (typeof color !== 'string') { return false; }
  return isUnprefixedHex(color) || isPrefixedHex(color);
}

export function prefixHex(color) {
  if (!isHex(color)) { return color; }
  if (isPrefixedHex(color)) { return color; }
  return `#${color}`;
}

/**
 * Will unprefix hex value
 * @param {string} color
 * @return {string} hex color value
 *
 * @example
 * unprefixHex('#ccc');
 */
export function unprefixHex(color) {
  if (!isHex(color)) { return color; }
  if (isUnprefixedHex(color)) { return color; }
  return color.slice(1);
}

export function createLongHex(color) {
  const prefixed = isPrefixedHex(color);
  const hex = unprefixHex(color);

  if (hex.length === 6) { return color; }

  if (hex.length === 3) {
    const longHex = hex.split('').map((chr) => chr + chr).join('');
    return prefixed ? prefixHex(longHex) : longHex;
  }

  return color;
}

export function splitHex(color, splitType = 'object') {
  const hex = unprefixHex(createLongHex(color));
  const chanels = [];

  for (let i = 0; i < hex.length; i += 2) {
    chanels.push(parseInt(hex.slice(i, i + 2), 16));
  }

  return splitType === 'object'
    ? { r: chanels[0], g: chanels[1], b: chanels[2] }
    : chanels;
}
