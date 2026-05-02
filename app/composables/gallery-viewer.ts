type Image = { src: string; alt: string };

export const useGalleryViewer = () => {
  const currentGalleryIndex = ref<number>(0);
  const galleryImages = useState<Image[]>('gallery-images', () => []);

  const currentGalleryImage = computed<Image | null>(() => galleryImages.value[currentGalleryIndex.value] ?? null);
  const isGalleryFilled = computed<boolean>(() => !!galleryImages.value.length);

  const selectPreviousImage = () => {
    currentGalleryIndex.value = mod(currentGalleryIndex.value - 1, galleryImages.value.length);
  };

  const selectNextImage = () => {
    currentGalleryIndex.value = mod(currentGalleryIndex.value + 1, galleryImages.value.length);
  };

  const setImages = (images: Image[]) => {
    galleryImages.value = images;
  };

  const resetImages = () => {
    currentGalleryIndex.value = 0;
    galleryImages.value = [];
  };

  return {
    currentGalleryIndex,
    galleryImages,
    currentGalleryImage,
    isGalleryFilled,
    selectPreviousImage,
    selectNextImage,
    setImages,
    resetImages,
  };
};
