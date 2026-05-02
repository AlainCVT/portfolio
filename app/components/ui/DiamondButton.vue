<script setup lang="ts">
  import type { NuxtRoute, RoutesNamesList } from '@typed-router';
  import type { HTMLTagNames } from '~/types/html';

  type Navigation = NuxtRoute<RoutesNamesList, '', false>;

  withDefaults(
    defineProps<{
      as?: HTMLTagNames | Component;
      href?: string;
      title?: string;
      to?: Navigation;
      label?: string;
      screenReader?: string;
      icon: string;
      isDisabled?: boolean;
    }>(),
    {
      as: 'button',
      href: undefined,
      title: undefined,
      to: undefined,
      label: '',
      screenReader: '',
    }
  );

  const NuxtLink = useNuxtLink();
</script>

<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : as"
    class="group pointer-events-none relative m-2 flex size-8 items-center justify-center text-xs outline-none sm:size-12 sm:text-xl"
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
    <div
      class="border-primary group-focus-visible:outline-primary pointer-events-auto absolute size-full rotate-45 overflow-hidden border-2 bg-black outline-2 outline-offset-2 outline-transparent"
    >
      <div
        class="absolute flex size-full items-center justify-center text-white transition-transform duration-400 *:-rotate-45 group-hover:-translate-x-full group-hover:-translate-y-full"
      >
        <Icon :name="icon" />
      </div>
      <div
        class="before:bg-primary absolute flex size-full translate-x-full translate-y-full items-center justify-center text-black transition-transform duration-400 *:-rotate-45 group-hover:translate-0 before:absolute before:inset-0 before:transition-transform before:duration-400 group-active:before:scale-[87.5%]"
      >
        <Icon :name="icon" />
      </div>
    </div>
    <span
      v-if="label"
      class="absolute top-full my-4 inline-block overflow-hidden"
    >
      <span
        class="font-CMU-Typewriter-Text inline-block translate-y-full py-px text-base text-white transition-transform duration-400 group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {{ label }}
      </span>
    </span>
    <span
      v-if="screenReader"
      class="sr-only"
    >
      {{ screenReader }}
    </span>
  </component>
</template>
