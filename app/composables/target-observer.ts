import type { ShallowRef } from 'vue';

export const useTargetObserver = <T extends HTMLElement | ComponentPublicInstance>(
  target: Readonly<ShallowRef<T | null>>,
  options?: ArgumentsType<typeof useIntersectionObserver>[2]
) => {
  const targetIsVisible = shallowRef<boolean>(false);

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        targetIsVisible.value = true;
        stop();
      }
    },
    options
  );

  return {
    targetIsVisible,
  };
};
