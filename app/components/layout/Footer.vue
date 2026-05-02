<script setup lang="ts">
  import pkg from '@/../package.json';

  const { author } = pkg;

  const target = useTemplateRef('target');
  const { targetIsVisible } = useTargetObserver(target, { threshold: 0.75 });
</script>

<template>
  <LayoutContainer
    ref="target"
    class="grid gap-2 pb-6 md:mt-12"
  >
    <UiLine
      class="text-primary justify-end"
      :is-active="targetIsVisible"
      :duration="800"
      orientation="horizontal"
    />
    <span class="font-CMU-Serif-Upright text-white-muted text-right text-base">
      © {{ new Date().getFullYear() }} &#x25C7; {{ author.name }}
    </span>
  </LayoutContainer>
</template>
