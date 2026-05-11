import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import UIScrollIndicator from '~/components/ui/ScrollIndicator.vue';

vi.mock('~/composables/target-observer', () => ({
  useTargetObserver: vi.fn(() => ({
    targetIsVisible: { value: true },
  })),
}));

vi.mock('#imports', () => ({
  useScroll: vi.fn(() => ({
    y: { value: 50 },
  })),
}));

describe('UI/ScrollIndicator', () => {
  it('renders scroll text and line', async () => {
    const wrapper = await mountSuspended(UIScrollIndicator);

    expect(wrapper.text()).toContain('scroll');
    expect(wrapper.findComponent({ name: 'UiLine' }).exists()).toBe(true);
  });

  it('applies correct CSS classes', async () => {
    const wrapper = await mountSuspended(UIScrollIndicator);

    const container = wrapper.find('div');
    expect(container.classes()).toContain('flex');
    expect(container.classes()).toContain('flex-col');
    expect(container.classes()).toContain('items-center');
    expect(container.classes()).toContain('gap-3');
  });

  it('hides text when shouldDisplayIndicator is false', async () => {
    // Mock to return false
    const { useTargetObserver } = await import('~/composables/target-observer');
    vi.mocked(useTargetObserver).mockReturnValue({
      targetIsVisible: shallowRef(false),
    });

    const wrapper = await mountSuspended(UIScrollIndicator);

    const textSpan = wrapper.find('span').find('span');
    expect(textSpan.classes()).toContain('translate-y-full');
  });

  it('shows text when shouldDisplayIndicator is true', async () => {
    // Mock to return true and y <= 96
    const { useTargetObserver } = await import('~/composables/target-observer');
    vi.mocked(useTargetObserver).mockReturnValue({
      targetIsVisible: shallowRef(true),
    });

    const wrapper = await mountSuspended(UIScrollIndicator);

    const textSpan = wrapper.find('span').find('span');
    expect(textSpan.classes()).not.toContain('translate-y-full');
  });

  it('passes correct props to UiLine', async () => {
    const wrapper = await mountSuspended(UIScrollIndicator);

    const lineComponent = wrapper.findComponent({ name: 'UiLine' });
    expect(lineComponent.props('orientation')).toBe('vertical');
    expect(lineComponent.props('duration')).toBe(400);
  });
});
