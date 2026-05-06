import type { OKLCHAColor, OKLCHColor } from '~/types/colors';

/**
 * Add alpha to OKLCH color.
 * @param {OKLCHColor} oklchColor The OKLCH color.
 * @param {number} alpha The alpha to add.
 * @returns {OKLCHAColor}
 * @example
 * addAlphaToOklch('oklch(1 0 360)', 0.5); // oklch(1 0 360 / 0.5)
 */
export function addAlphaToOklch(oklchColor: OKLCHColor, alpha: number): OKLCHAColor {
  return oklchColor.replace(/oklch\((.*?)\)/, `oklch($1 / ${alpha})`) as OKLCHAColor;
}
