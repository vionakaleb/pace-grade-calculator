// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/test-utils/module"],

  // Nuxt UI configuration
  // ui: {
  //   global: true,
  //   icons: ['heroicons', 'simple-icons']
  // },

  // Runtime config to expose variables to the server-side
  runtimeConfig: {
    // This key is only available on the server
    // geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
  },
  app: {
    baseURL: '/<repository-name>/'
  }
})
