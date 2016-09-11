export function validateChanel(chanel) {
  return (
    typeof chanel === 'number' // should always be a number
    && chanel % 1 === 0 // integer number, also detects NaN
    && chanel >= 0
    && chanel <= 255
  );
}
