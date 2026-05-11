import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import UITitle from '~/components/ui/Title.vue';

describe('UI/Title', () => {
  it('renders with default h2 tag', async () => {
    const wrapper = await mountSuspended(UITitle, {
      slots: {
        default: 'Test title',
      },
    });

    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test title');
  });

  it('renders with custom heading tag', async () => {
    const wrapper = await mountSuspended(UITitle, {
      props: {
        as: 'h1',
      },
      slots: {
        default: 'Main title',
      },
    });

    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h2').exists()).toBe(false);
  });

  it('applies correct CSS classes', async () => {
    const wrapper = await mountSuspended(UITitle, {
      slots: {
        default: 'Styled title',
      },
    });

    const titleElement = wrapper.find('h2');
    expect(titleElement.classes()).toContain('font-CMU-Serif-Upright');
    expect(titleElement.classes()).toContain('text-2xl');
    expect(titleElement.classes()).toContain('sm:text-4xl');
  });
});
