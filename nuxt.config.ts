import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Alain Cao Van Truong ◇ Portfolio',
      meta: [
        {
          name: 'description',
          content:
            'I, Alain Cao Van Truong, am a full-stack web developer based near Paris, France. I am specialized in front-end development with Vue.js, Nuxt.js, and Tailwind CSS, and I would love to level up in back-end development with Node.js frameworks such as Express.jsn Hono.js or AdonisJS.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
    'nuxt-typed-router',
    '@vee-validate/nuxt',
  ],
  css: ['@/assets/styles/main.css'],
  vite: {
    optimizeDeps: {
      include: ['lenis', 'valibot'],
    },
    plugins: [tailwindcss()],
  },
  content: {
    renderer: {
      anchorLinks: false,
    },
  },
});
