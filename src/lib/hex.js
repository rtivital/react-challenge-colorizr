export function isUnprefixedHex(color) {
  return /(^[0-9A-F]{3}$)|(^[0-9A-F]{6}$)/i.test(color);
}

export function isPrefixedHex(color) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
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

export function unprefixHex(color) {
  if (!isHex(color)) { return color; }
  console.log(isUnprefixedHex(color));
  if (isUnprefixedHex(color)) { return color; }
  return color.slice(1);
}
