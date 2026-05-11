import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import UILine from '~/components/ui/Line.vue';

describe('UI/Line', () => {
  it('renders horizontal line by default', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'horizontal',
      },
    });

    const container = wrapper.find('div');
    expect(container.classes()).toContain('h-0.5');
    expect(container.classes()).toContain('w-full');
  });

  it('renders vertical line', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'vertical',
      },
    });

    const container = wrapper.find('div');
    expect(container.classes()).toContain('h-full');
    expect(container.classes()).toContain('w-0.5');
    expect(container.classes()).toContain('flex-col');
  });

  it('applies active state correctly for horizontal', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'horizontal',
        isActive: true,
      },
    });

    const line = wrapper.find('div').find('div');
    expect(line.classes()).toContain('w-full');
  });

  it('applies inactive state correctly for horizontal', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'horizontal',
        isActive: false,
      },
    });

    const line = wrapper.find('div').find('div');
    expect(line.classes()).toContain('w-0');
  });

  it('applies active state correctly for vertical', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'vertical',
        isActive: true,
      },
    });

    const line = wrapper.find('div').find('div');
    expect(line.classes()).toContain('h-full');
  });

  it('applies inactive state correctly for vertical', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'vertical',
        isActive: false,
      },
    });

    const line = wrapper.find('div').find('div');
    expect(line.classes()).toContain('h-0');
  });

  it('renders decorative elements', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'horizontal',
      },
    });

    const decorators = wrapper.findAll('div').filter((element) => element.classes().includes('absolute'));
    expect(decorators).toHaveLength(2);
  });

  it('applies custom duration', async () => {
    const wrapper = await mountSuspended(UILine, {
      props: {
        orientation: 'horizontal',
        duration: 600,
      },
    });

    // Note: Testing CSS custom properties might require additional setup.
    // For now, we verify the component renders without errors.
    expect(wrapper.exists()).toBe(true);
  });
});
