import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: {
        include: 'projects/*.md',
        prefix: '/projects',
      },
    }),
    sections: defineCollection({
      type: 'page',
      source: {
        include: 'sections/*.md',
        prefix: '/sections',
      },
    }),
  },
});
