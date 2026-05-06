import { describe, expect, it } from 'vitest';
import { addAlphaToOklch } from '~/composables/colors';
import type { OKLCHAColor, OKLCHColor } from '~/types/colors';

type OKLCHFixture = {
  inputColor: OKLCHColor;
  alpha: number;
  expectedColor: OKLCHAColor;
};

const oklchFixtures: OKLCHFixture[] = [
  {
    inputColor: 'oklch(100% 0 360)',
    alpha: 0.5,
    expectedColor: 'oklch(100% 0 360 / 0.5)',
  },
  {
    inputColor: 'oklch(60% 0.2 180)',
    alpha: 0.8,
    expectedColor: 'oklch(60% 0.2 180 / 0.8)',
  },
  {
    inputColor: 'oklch(40% 0.9 240)',
    alpha: 0.2,
    expectedColor: 'oklch(40% 0.9 240 / 0.2)',
  },
];

describe('addAlphaToOklch', () => {
  it.each(oklchFixtures)('should add alpha to OKLCH color', ({ inputColor, alpha, expectedColor }) => {
    const result = addAlphaToOklch(inputColor, alpha);
    expect(result).toBe(expectedColor);
  });
});
