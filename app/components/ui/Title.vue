<script setup lang="ts">
  import type { HTMLTagNames } from '~/types/html';

  withDefaults(
    defineProps<{
      as?: Extract<HTMLTagNames, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
    }>(),
    {
      as: 'h2',
    }
  );

  const target = useTemplateRef('target');
  const { targetIsVisible } = useTargetObserver(target, { threshold: 0.75 });
</script>

<template>
  <div
    ref="target"
    class="grid"
  >
    <component
      :is="as"
      class="font-CMU-Serif-Upright text-2xl sm:text-4xl"
    >
      <slot />
    </component>
    <UiLine
      class="text-primary"
      :is-active="targetIsVisible"
      :duration="400"
      orientation="horizontal"
    />
  </div>
</template>
