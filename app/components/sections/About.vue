<script setup lang="ts">
  const { data: about } = await useAsyncData(() => queryCollection('sections').first());
</script>

<template>
  <ContentRenderer
    v-if="about"
    :value="about"
  />
</template>
