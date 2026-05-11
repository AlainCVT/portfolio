import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import UIDiamondButton from '~/components/ui/DiamondButton.vue';

mockComponent('NuxtIcon', {
  template: '<span class="nuxt-icon-mock">{{ name }}</span>',
  props: ['name'],
});

describe('UI/DiamondButton component', () => {
  it('renders with required icon prop', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'mingcute:close-fill',
        label: 'Close',
      },
    });

    expect(wrapper.props('icon')).toBe('mingcute:close-fill');
    expect(wrapper.text()).toContain('Close');
    expect(wrapper.find('.iconify').exists()).toBe(true);
  });

  it('renders as button element as default', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'material-symbols:block',
        label: 'This is a button',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('renders as custom element', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        as: 'div',
        icon: 'streamline-plump:button-play-circle-remix',
        label: 'This is a div',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('renders as NuxtLink when to prop is provided', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'material-symbols:home-rounded',
        label: 'Go to home',
        to: '/',
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.props('to')).toBe('/');
  });

  it('renders as anchor with href', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'mingcute:external-link-line',
        label: 'External link',
        href: 'https://example.com',
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
    expect(wrapper.attributes('target')).toBe('_blank');
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
  });

  it('applies disabled state correctly', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'material-symbols:block',
        label: 'Disabled',
        isDisabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBe('');
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });

  it('has diamond-shaped border styling', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'material-symbols:diamond-shine',
        label: 'Diamond',
      },
    });

    const borderDiv = wrapper.find('div');
    expect(borderDiv.classes()).toContain('rotate-45');
    expect(borderDiv.classes()).toContain('border-2');
    expect(borderDiv.classes()).toContain('border-primary');
  });

  it('includes screen reader text when provided', async () => {
    const wrapper = await mountSuspended(UIDiamondButton, {
      props: {
        icon: 'material-symbols:hearing-disabled-rounded',
        label: 'Button',
        screenReader: 'Accessible description',
      },
    });

    expect(wrapper.text()).toContain('Accessible description');
  });
});
