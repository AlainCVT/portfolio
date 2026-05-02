type Easing = (x: number) => number;

const C1 = 1.70158;
const C2 = C1 * 1.525;
const C3 = C1 + 1;
const C4 = (2 * Math.PI) / 3;
const C5 = (2 * Math.PI) / 4.5;
const N1 = 7.5625;
const D1 = 2.75;

export const easeLinear: Easing = (x) => x;
export const easeInSine: Easing = (x) => 1 - Math.cos((x * Math.PI) / 2);
export const easeOutSine: Easing = (x) => Math.sin((x * Math.PI) / 2);
export const easeInOutSine: Easing = (x) => -(Math.cos(Math.PI * x) - 1) / 2;
export const easeInQuad: Easing = (x) => x * x;
export const easeOutQuad: Easing = (x) => 1 - (1 - x) * (1 - x);
export const easeInOutQuad: Easing = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
export const easeInCubic: Easing = (x) => x * x * x;
export const easeOutCubic: Easing = (x) => 1 - Math.pow(1 - x, 3);
export const easeInOutCubic: Easing = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeInQuart: Easing = (x) => x * x * x * x;
export const easeOutQuart: Easing = (x) => 1 - Math.pow(1 - x, 4);
export const easeInOutQuart: Easing = (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2);
export const easeInQuint: Easing = (x) => x * x * x * x * x;
export const easeOutQuint: Easing = (x) => 1 - Math.pow(1 - x, 5);
export const easeInOutQuint: Easing = (x) => (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2);
export const easeInExpo: Easing = (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10));
export const easeOutExpo: Easing = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const easeInOutExpo: Easing = (x) =>
  x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
export const easeInCirc: Easing = (x) => 1 - Math.sqrt(1 - Math.pow(x, 2));
export const easeOutCirc: Easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));
export const easeInOutCirc: Easing = (x) =>
  x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
export const easeInBack: Easing = (x) => C3 * x * x * x - C1 * x * x;
export const easeOutBack: Easing = (x) => 1 + C3 * Math.pow(x - 1, 3) + C1 * Math.pow(x - 1, 2);
export const easeInOutBack: Easing = (x) =>
  x < 0.5
    ? (Math.pow(2 * x, 2) * ((C2 + 1) * 2 * x - C2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((C2 + 1) * (x * 2 - 2) + C2) + 2) / 2;
export const easeInElastic: Easing = (x) =>
  x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * C4);
export const easeOutElastic: Easing = (x) =>
  x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * C4) + 1;
export const easeInOutElastic: Easing = (x) =>
  x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * C5)) / 2
        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * C5)) / 2 + 1;
export const easeInBounce: Easing = (x) => 1 - easeOutBounce(1 - x);
export const easeOutBounce: Easing = (x) =>
  x < 1 / D1
    ? N1 * x * x
    : x < 2 / D1
      ? N1 * (x -= 1.5 / D1) * x + 0.75
      : x < 2.5 / D1
        ? N1 * (x -= 2.25 / D1) * x + 0.9375
        : N1 * (x -= 2.625 / D1) * x + 0.984375;
export const easeInOutBounce: Easing = (x) =>
  x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2;
