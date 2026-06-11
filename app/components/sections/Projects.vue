<script setup lang="ts">
  import type { ProjectsCollectionItem } from '@nuxt/content';

  const { data: projects } = await useAsyncData(() => queryCollection('projects').all());

  const workExperienceList = computed<ProjectsCollectionItem[]>(
    () => projects.value?.filter(({ company }) => !!company) ?? []
  );
  const sideProjectsList = computed<ProjectsCollectionItem[]>(
    () => projects.value?.filter(({ company }) => !company) ?? []
  );
</script>

<template>
  <LayoutSection v-if="workExperienceList.length">
    <template #title>Work experience</template>
    <div class="col-span-full grid grid-cols-12 gap-x-6 gap-y-12">
      <ModulesProjectWrapper
        v-for="(project, i) in workExperienceList"
        :key="project.id"
        :project
        :is-reversed="!(i % 2)"
        class="col-span-full content-start sm:col-span-6 sm:pr-6 lg:col-span-4 2xl:col-span-3"
        :class="[
          'col-start-1',
          {
            'sm:col-start-1 lg:col-start-3 2xl:col-start-4': !(i % 2),
            'sm:col-start-7 lg:col-start-7 2xl:col-start-7': i % 2,
          },
        ]"
        :style="{ gridRowStart: i + 1 }"
      />
    </div>
  </LayoutSection>
  <LayoutSection v-if="sideProjectsList.length">
    <template #title>Side projects</template>
    <div class="col-span-full grid grid-cols-12 gap-x-6 gap-y-12">
      <ModulesProjectWrapper
        v-for="project in sideProjectsList"
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
