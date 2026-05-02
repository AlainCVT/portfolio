<script setup lang="ts">
  const { data: projects } = await useAsyncData(() => queryCollection('projects').all());
</script>

<template>
  <LayoutSection>
    <template #title>Projects</template>
    <div
      v-if="projects"
      class="col-span-full grid grid-cols-12 gap-x-6 gap-y-12"
    >
      <ModulesProjectWrapper
        v-for="project in projects"
        :key="project.id"
        :project
        class="col-span-full content-start sm:col-span-6 sm:pr-6 lg:col-span-4 2xl:col-span-3"
        :class="[
          '2xl:nth-[4n+1]:group-delay-0 2xl:nth-[4n+2]:group-delay-100 2xl:nth-[4n+3]:group-delay-200 2xl:nth-[4n+4]:group-delay-300',
          'lg:nth-[3n+1]:group-delay-0 lg:nth-[3n+2]:group-delay-100 lg:nth-[3n+3]:group-delay-200',
          'sm:nth-[2n+1]:group-delay-0 sm:nth-[2n+2]:group-delay-100',
        ]"
      />
    </div>
  </LayoutSection>
</template>
