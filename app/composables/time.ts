/**
 * Returns the duration progress from a start date.
 * @param {Date} startDate The start date.
 * @param {number} duration The limit duration in milliseconds.
 * @returns {number} The progress between 0 and 1.
 * @example
 * const currentDate = new Date();
 *
 * setTimeout(() => {
 *   console.log(getDurationProgress(currentDate, 1000)); // ~ 0.5
 * }, 500);
 *
 * setTimeout(() => {
 *   console.log(getDurationProgress(currentDate, 1000)); // ~ 0.75
 * }, 750);
 *
 * setTimeout(() => {
 *   console.log(getDurationProgress(currentDate, 1000)); // 1
 * }, 1500);
 *
 * setTimeout(() => {
 *   console.log(getDurationProgress(currentDate, 2000)); // ~ 0.5
 * }, 1000);
 */
export const getDurationProgress = (startDate: Date, duration: number = 1000): number =>
  Math.min(1, Math.max(0, (Date.now() - startDate.getTime()) / duration));
