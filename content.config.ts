import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: {
        include: 'projects/*.md',
        prefix: '/projects',
      },
      schema: z.object({
        company: z.string().optional(),
        warning: z.string().optional(),
        isOffline: z.boolean().optional(),
        url: z.string().url().optional(),
        images: z.array(
          z.object({
            src: z.string(),
            alt: z.string(),
          })
        ),
        tools: z.array(z.string()),
      }),
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
