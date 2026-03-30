// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },
  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'fr', iso: 'fr-FR', name: 'Francais', file: 'fr.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ]
  },
  supabase: {
    redirect: false,
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY || 'public-anon-key'
  }
})
