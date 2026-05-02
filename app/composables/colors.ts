import type { OKLCHAColor, OKLCHColor } from '~/types/colors';

/**
 * Add alpha to OKLCH color.
 * @param {OKLCHColor} oklchStr The OKLCH color.
 * @param {number} opacity The opacity to add.
 * @returns {OKLCHAColor}
 * @example
 * addAlphaToOklch('oklch(1 0 360)', 0.5); // oklch(1 0 360 / 0.5)
 */
export function addAlphaToOklch(oklchStr: OKLCHColor, opacity: number): OKLCHAColor {
  return oklchStr.replace(/oklch\((.*?)\)/, `oklch($1 / ${opacity})`) as OKLCHAColor;
}
