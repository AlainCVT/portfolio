import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import UiButton from '~/components/ui/Button.vue';

describe('UI/Button component', () => {
  it('renders with label prop', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: {
        label: 'Click me',
      },
    });

    expect(wrapper.text()).toContain('Click me');
  });

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(UiButton, {
      slots: {
        default: 'Custom slot content',
      },
    });

    expect(wrapper.text()).toContain('Custom slot content');
  });

  it('applies disabled state', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: {
        label: 'Disabled button',
        isDisabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBe('');
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });

  it('handles NuxtLink navigation', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: {
        label: 'Home',
        to: '/',
      },
    });

    expect(wrapper.props('to')).toBe('/');
    expect(wrapper.attributes('href')).toBe('/');
  });

  it('renders as anchor with href', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: {
        label: 'External',
        href: 'https://example.com',
      },
    });

    expect(wrapper.attributes('href')).toBe('https://example.com');
    expect(wrapper.attributes('target')).toBe('_blank');
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
  });

  it('has correct default element type', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: {
        label: 'Test',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('renders screen reader text', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: {
        label: 'Delete',
        screenReader: 'Delete this item permanently',
      },
    });

    expect(wrapper.text()).toContain('Delete this item permanently');
  });
});
