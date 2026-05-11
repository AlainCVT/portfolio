import { describe, expect, it, vi } from 'vitest';
import { getDurationProgress } from '~/composables/time';

describe('getDurationProgress', () => {
  it('should return 0 at start', () => {
    const startDate = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(startDate);
    expect(getDurationProgress(startDate)).toBe(0);
    vi.useRealTimers();
  });

  it('should return 0.5 after half duration', () => {
    const startDate = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startDate.getTime() + 500));
    expect(getDurationProgress(startDate)).toBe(0.5);
    vi.useRealTimers();
  });

  it('should return 1 after full duration', () => {
    const startDate = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startDate.getTime() + 1000));
    expect(getDurationProgress(startDate)).toBe(1);
    vi.useRealTimers();
  });

  it('should not exceed 1', () => {
    const startDate = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startDate.getTime() + 2000));
    expect(getDurationProgress(startDate)).toBe(1);
    vi.useRealTimers();
  });

  it('should handle custom duration', () => {
    const startDate = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startDate.getTime() + 1000));
    expect(getDurationProgress(startDate, 2000)).toBe(0.5);
    vi.useRealTimers();
  });
});
