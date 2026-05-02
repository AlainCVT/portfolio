/**
 * Returns the modulo of a number.
 * @param {number} n The number to calculate the modulo of.
 * @param {number} m The modulo.
 * @returns {number} The modulo of the number.
 * @example
 * mod(5, 3); // 2
 * mod(-5, 3); // 1
 */
export const mod = (n: number, m: number): number => ((n % m) + m) % m;
