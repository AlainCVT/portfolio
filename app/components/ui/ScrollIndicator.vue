<script setup lang="ts">
  const target = useTemplateRef('target');
  const { targetIsVisible } = useTargetObserver(target, { threshold: 1 });

  const { y } = useScroll(window);

  const shouldDisplayIndicator = computed<boolean>(() => targetIsVisible.value && y.value <= 96);
</script>

<template>
  <div
    ref="target"
    class="flex flex-col items-center gap-3"
  >
    <span class="inline-block overflow-hidden">
      <span
        class="inline-block py-px text-xs font-semibold uppercase transition-transform delay-200 duration-400"
        :class="{ 'translate-y-full': !shouldDisplayIndicator }"
      >
        scroll
      </span>
    </span>
    <div class="h-8">
      <UiLine
        class="justify-end"
        :is-active="shouldDisplayIndicator"
        :duration="400"
        orientation="vertical"
      />
    </div>
  </div>
</template>
