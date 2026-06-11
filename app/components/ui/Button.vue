<script setup lang="ts">
  import type { NuxtRoute, RoutesNamesList } from '@typed-router';
  import type { VNode } from 'vue';
  import type { HTMLTagNames } from '~/types/html';

  type Navigation = NuxtRoute<RoutesNamesList, '', false>;

  withDefaults(
    defineProps<{
      as?: HTMLTagNames | Component;
      href?: string;
      title?: string;
      to?: Navigation;
      direction?: 'top' | 'bottom' | 'left' | 'right';
      label?: string;
      screenReader?: string;
      isDisabled?: boolean;
    }>(),
    {
      as: 'button',
      href: undefined,
      title: undefined,
      to: undefined,
      direction: 'top',
      label: '',
      screenReader: '',
    }
  );

  const slots = defineSlots<{
    default?: () => VNode;
  }>();

  const NuxtLink = useNuxtLink();
</script>

<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : as"
    class="group focus-visible:outline-primary relative grid h-8 border-2 border-white bg-black font-semibold whitespace-nowrap text-white outline-2 outline-offset-4 outline-transparent"
    :to
    :href
    :title
    :disabled="isDisabled"
    v-bind="{
      ...$attrs,
      ...(isDisabled && { disabled: true, tabindex: '-1' }),
      ...(href && { target: '_blank', rel: 'noopener noreferrer' }),
    }"
  >
    <span
      class="relative flex size-full overflow-hidden *:transition-transform *:duration-400"
      :class="{
        '*:group-hover:-translate-y-full': direction === 'top',
        '*:group-hover:-translate-x-full': direction === 'left',
        '*:group-hover:translate-y-full': direction === 'bottom',
        '*:group-hover:translate-x-full': direction === 'right',
      }"
    >
      <span class="flex size-full items-center justify-center px-2 text-white">
        <slot
          v-if="slots.default"
          name="default"
        />
        <template v-else>{{ label }}</template>
      </span>
      <span
        class="before:transition-size absolute flex size-full items-center justify-center px-2 text-black before:absolute before:size-full before:bg-white before:duration-400 group-active:before:size-[calc(100%-0.25rem)]"
        :class="{
          'after:absolute after:inset-0 after:flex after:items-center after:justify-center after:content-[attr(data-label)]':
            label,
          'top-full': direction === 'top',
          'left-full': direction === 'left',
          'bottom-full': direction === 'bottom',
          'right-full': direction === 'right',
        }"
        :data-label="label"
      >
        <span class="relative flex items-center">
          <slot
            v-if="slots.default"
            name="default"
          />
        </span>
        <span
          v-if="screenReader"
          class="sr-only"
        >
          {{ screenReader }}
        </span>
      </span>
    </span>
  </component>
</template>
