<script setup lang="ts">
  const { currentGalleryImage, isGalleryFilled, selectPreviousImage, selectNextImage, resetImages } =
    useGalleryViewer();

  useEventListener('keydown', (event) => {
    if (isGalleryFilled.value) {
      if (event.key === 'Escape') {
        resetImages();
      }

      if (event.key === 'ArrowLeft') {
        selectPreviousImage();
      }

      if (event.key === 'ArrowRight') {
        selectNextImage();
      }
    }
  });
</script>

<template>
  <Transition name="fade-400">
    <div
      v-if="isGalleryFilled"
      class="fixed inset-0 bg-black/90"
    />
  </Transition>
  <div class="pointer-events-none fixed inset-0">
    <Transition name="fade-400">
      <div
        v-if="isGalleryFilled"
        class="absolute flex size-full items-center justify-center"
      >
        <img
          v-if="currentGalleryImage"
          :src="currentGalleryImage.src"
          :alt="currentGalleryImage.alt"
          class="size-full object-contain"
        />
      </div>
    </Transition>
    <Transition name="fade-400">
      <div
        v-if="isGalleryFilled"
        class="absolute -right-8 -bottom-8 -left-8 h-40 bg-linear-0 from-black to-black/20 blur-xl"
      />
    </Transition>
    <LayoutContainer class="relative flex h-full flex-col items-end justify-between py-12">
      <Transition name="fade-out-400">
        <UiDiamondButton
          v-if="isGalleryFilled"
          class="pointer-events-auto"
          icon="mingcute:close-fill"
          screen-reader="Close"
          @click="resetImages()"
        />
      </Transition>
      <div class="flex w-full items-end justify-between gap-6">
        <Transition name="fade-up-400">
          <p
            v-if="isGalleryFilled"
            class="pointer-events-auto"
          >
            {{ currentGalleryImage?.alt }}
          </p>
        </Transition>
        <div class="flex items-center gap-3">
          <Transition name="fade-out-400">
            <UiButton
              v-if="isGalleryFilled"
              class="pointer-events-auto text-xl"
              screen-reader="Previous"
              @click="selectPreviousImage()"
            >
              <Icon name="material-symbols:arrow-left" />
            </UiButton>
          </Transition>
          <Transition name="fade-out-400">
            <UiButton
              v-if="isGalleryFilled"
              class="pointer-events-auto text-xl"
              screen-reader="Next"
              @click="selectNextImage()"
            >
              <Icon name="material-symbols:arrow-right" />
            </UiButton>
          </Transition>
        </div>
      </div>
    </LayoutContainer>
  </div>
</template>
