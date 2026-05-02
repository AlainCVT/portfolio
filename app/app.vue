<script setup lang="ts">
  import Lenis from 'lenis';

  const { data: projects } = await useAsyncData(() => queryCollection('projects').all());

  const { galleryImages } = useGalleryViewer();

  function loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }

  onMounted(() => {
    const lenis = new Lenis({ autoRaf: true });

    // Preload images
    if (projects.value) {
      const images = projects.value.map((project) => project.images).flat();
      images.forEach((image) => {
        loadImage(image.src);
      });
    }

    // Toggle scroll behavior if the gallery is open
    watch(galleryImages, (galleryImages) => {
      if (galleryImages.length) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
  });
</script>

<template>
  <div>
    <FeaturesCanvas />
    <LayoutHero />
    <main class="min-h-screen">
      <NuxtPage />
    </main>
    <LayoutFooter />
    <FeaturesGalleryViewer />
  </div>
</template>
