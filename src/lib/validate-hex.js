export default function(color) {
  if (typeof color !== 'string') { return false; }
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}
