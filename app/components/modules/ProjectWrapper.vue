<script setup lang="ts">
  import type { ProjectsCollectionItem } from '@nuxt/content';

  defineProps<{
    project: ProjectsCollectionItem;
  }>();

  const target = useTemplateRef('target');
  const { targetIsVisible } = useTargetObserver(target, { threshold: 0.75 });

  const { setImages } = useGalleryViewer();
</script>

<template>
  <article
    ref="target"
    :key="project.id"
    class="relative flex flex-col justify-items-start gap-6"
  >
    <div class="absolute top-0 right-full bottom-0 flex w-6 justify-center">
      <UiLine
        class="text-white"
        :is-active="targetIsVisible"
        :duration="800"
        orientation="vertical"
      />
    </div>
    <div class="grid">
      <h3 class="inline-block font-semibold text-white">{{ project.title }}</h3>
      <p class="text-white-muted inline italic">{{ project.description }}</p>
    </div>
    <ContentRenderer
      class="content-renderer mb-4 grow"
      :value="project"
    />
    <div class="grid gap-2">
      <div class="grid">
        <span
          v-if="project.isOffline"
          class="text-white-muted italic"
        >
          <span class="font-semibold text-white">NB:</span>
          this website is no longer available
        </span>
        <span
          v-if="project.warning"
          class="text-primary italic"
        >
          <Icon
            name="material-symbols:warning-outline-rounded"
            class="-mb-0.5"
          />
          {{ project.warning }}
        </span>
      </div>
      <div class="flex flex-wrap gap-3">
        <UiButton
          label="View gallery"
          @click="setImages(project.images)"
        >
          View gallery
        </UiButton>
        <UiButton
          v-if="!project.isOffline"
          :href="project.url"
          :title="project.title"
          label="Visit project"
        />
      </div>
    </div>
  </article>
</template>
