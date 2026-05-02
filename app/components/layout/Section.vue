<script setup lang="ts">
  defineSlots<{
    default: () => VNode;
    title: () => VNode;
    heading?: () => VNode;
  }>();
</script>

<template>
  <LayoutContainer
    as="section"
    class="grid grid-cols-12 gap-x-6 gap-y-12"
  >
    <div class="col-span-full grid grid-flow-col items-center gap-4 justify-self-start sm:justify-self-center md:gap-8">
      <UiTitle as="h2">
        <slot
          mdc-unwrap="p"
          name="title"
        />
      </UiTitle>
      <slot
        mdc-unwrap="p"
        name="heading"
      />
    </div>
    <slot />
  </LayoutContainer>
</template>
