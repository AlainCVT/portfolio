import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import LayoutContainer from '~/components/layout/Container.vue';

describe('Layout/Container component', () => {
  it('renders with default div element', async () => {
    const wrapper = await mountSuspended(LayoutContainer, {
      slots: {
        default: 'Container content',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.text()).toContain('Container content');
  });

  it('renders with custom element type', async () => {
    const wrapper = await mountSuspended(LayoutContainer, {
      props: {
        as: 'section',
      },
      slots: {
        default: 'Section content',
      },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.text()).toContain('Section content');
  });

  it('applies container styling', async () => {
    const wrapper = await mountSuspended(LayoutContainer, {
      slots: {
        default: 'Test content',
      },
    });

    expect(wrapper.classes()).toContain('container');
    expect(wrapper.classes()).toContain('mx-auto');
    expect(wrapper.classes()).toContain('px-6');
  });

  it('renders slot content correctly', async () => {
    const wrapper = await mountSuspended(LayoutContainer, {
      slots: {
        default: '<p>Paragraph content</p><span>Span content</span>',
      },
    });

    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.text()).toContain('Paragraph content');
    expect(wrapper.text()).toContain('Span content');
  });

  it('handles empty slots correctly', async () => {
    const wrapper = await mountSuspended(LayoutContainer);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe('');
  });
});
