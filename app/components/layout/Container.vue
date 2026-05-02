<script setup lang="ts">
  import type { HTMLTagNames } from '~/types/html';

  withDefaults(
    defineProps<{
      as?: HTMLTagNames;
    }>(),
    {
      as: 'div',
    }
  );
</script>

<template>
  <component
    :is="as"
    class="container mx-auto px-6"
  >
    <slot />
  </component>
</template>
