import { describe, expect, it } from 'vitest';
import { mod } from '~/composables/maths';

describe('mod', () => {
  it('should return positive modulo', () => {
    expect(mod(5, 3)).toBe(2);
    expect(mod(-5, 3)).toBe(1);
  });

  it('should handle zero', () => {
    expect(mod(0, 5)).toBe(0);
  });

  it('should handle negative numbers', () => {
    expect(mod(-1, 4)).toBe(3);
  });
});
