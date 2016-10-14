export function createGradient(colors, direction = 'right') {
  let gradient = `linear-gradient(to ${direction},`;
  const { length } = colors;

  colors.forEach((color, index) => {
    const percent = 100 * (index + 1) / length;
    gradient += `${color} ${percent}%,`;
  });

  gradient = gradient.slice(0, gradient.length - 1);
  gradient += ')';

  return gradient;
}
