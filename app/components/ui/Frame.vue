<template>
  <div class="border-primary relative border-2 p-0.5">
    <slot />
    <div
      v-for="i in 4"
      :key="i"
      class="before:border-primary absolute flex items-center justify-center before:absolute before:size-1.5 before:rotate-45 before:border-2 before:bg-black"
      :class="{
        '-top-px -left-px': i === 1,
        '-top-px -right-px': i === 2,
        '-right-px -bottom-px': i === 3,
        '-bottom-px -left-px': i === 4,
      }"
    />
  </div>
</template>
