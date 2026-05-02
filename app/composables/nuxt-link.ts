import type { NuxtLinkOptions } from '#app';

export const useNuxtLink = (options?: NuxtLinkOptions) => defineNuxtLink(options || { componentName: 'NuxtLink' });
