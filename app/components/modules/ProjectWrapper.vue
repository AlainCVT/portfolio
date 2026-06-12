<script setup lang="ts">
  import type { ProjectsCollectionItem } from '@nuxt/content';

  defineProps<{
    project: ProjectsCollectionItem;
    isReversed?: boolean;
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
    <div
      class="absolute top-0 right-full bottom-0 flex w-6 justify-center"
      :class="{ 'sm:left-full': isReversed }"
    >
      <UiLine
        class="text-white"
        :is-active="targetIsVisible"
        :duration="800"
        orientation="vertical"
      />
    </div>
    <div class="grid">
      <h3 class="inline-block text-white">
        <span class="font-semibold">
          {{ project.title }}
        </span>
        <template v-if="project.company">
          {{ ' ' }}
          <span class="text-white-muted">at</span>
          {{ project.company }}
        </template>
      </h3>
      <p class="text-white-muted inline italic">{{ project.description }}</p>
    </div>
    <div class="mb-4 grid grow content-start gap-4">
      <ContentRenderer
        class="content-renderer"
        :value="project"
      />
      <div
        v-if="project.tools.length"
        class="content-renderer"
      >
        <p>
          <strong>Tools:</strong>
        </p>
        <ul>
          <li
            v-for="(tool, i) in project.tools"
            :key="`tool-${i}`"
          >
            <code>{{ tool }}</code>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid gap-2">
      <div class="grid">
        <span
          v-if="project.isOffline"
          class="text-white-muted italic"
        >
          <span class="font-semibold text-white">NB:</span>
          the website is no longer available online
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
          v-if="!project.isOffline && project.url"
          :href="project.url"
          :title="project.title"
          label="Visit project"
        />
      </div>
    </div>
  </article>
</template>
