// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@sidebase/nuxt-auth", '@pinia/nuxt',],
  auth: {
    baseURL: process.env.AUTH_ORIGIN
  }
})
