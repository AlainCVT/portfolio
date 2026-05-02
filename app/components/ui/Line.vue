<script setup lang="ts">
  withDefaults(
    defineProps<{
      isActive?: boolean;
      duration?: 200 | 400 | 600 | 800;
      orientation: 'horizontal' | 'vertical';
    }>(),
    {
      isActive: true,
      duration: 400,
    }
  );
</script>

<template>
  <div
    class="flex"
    :class="orientation === 'horizontal' ? 'h-0.5 w-full' : 'h-full w-0.5 flex-col'"
  >
    <div
      class="transition-size relative flex bg-current delay-(--group-delay)"
      :class="[
        $style.line,
        orientation === 'horizontal'
          ? ['items-center', isActive ? 'w-full' : 'w-0']
          : ['justify-center', isActive ? 'h-full' : 'h-0'],
      ]"
    >
      <div
        v-for="i in 2"
        :key="i"
        class="absolute flex items-center justify-center before:absolute before:size-1.5 before:origin-center before:rotate-45 before:border-2 before:border-current before:bg-black before:transition-transform before:duration-200"
        :class="{
          'left-0': orientation === 'horizontal' && i === 1,
          'right-0': orientation === 'horizontal' && i === 2,
          'top-0': orientation === 'vertical' && i === 1,
          'bottom-0': orientation === 'vertical' && i === 2,
          'before:scale-0': !isActive,
        }"
      />
    </div>
  </div>
</template>

<style module>
  .line {
    transition-duration: calc(v-bind(duration) * 1ms);
  }
</style>
