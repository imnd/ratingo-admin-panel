import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  // Enable SSR globally to bypass Vite Node IPC socket bug on Windows/SPA
  ssr: true,

  // Render all pages on the client-side (SPA mode)
  routeRules: {
    '/**': { ssr: false }
  },

  // Source directory
  srcDir: 'src',

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Nuxt 4 compatibility configuration
  future: {
    compatibilityVersion: 4,
  },

  // Directory layout mappings
  dir: {
    app: 'app', // Keeps app.vue and router.options.ts in src/app/
    plugins: '../plugins'
  },

  // Register component directories for auto-import
  components: [
    { path: fileURLToPath(new URL('./src/modules/analytics/components', import.meta.url)), pathPrefix: false },
    { path: fileURLToPath(new URL('./src/modules/feedback/components', import.meta.url)), pathPrefix: false }
  ],

  // Custom hooks to resolve layout and page scans outside of default app/ folder
  hooks: {
    'layouts:dirs'(dirs) {
      dirs.push({
        path: fileURLToPath(new URL('./src/layouts', import.meta.url))
      })
    },
    'pages:extend'(pages) {
      pages.push({
        name: 'analytics',
        path: '/analytics',
        file: fileURLToPath(new URL('./src/modules/analytics/pages/index.vue', import.meta.url))
      })
      pages.push({
        name: 'feedback',
        path: '/feedback',
        file: fileURLToPath(new URL('./src/modules/feedback/pages/index.vue', import.meta.url))
      })
    }
  },

  // Auto-import directories relative to srcDir (src/)
  imports: {
    dirs: [
      'stores',
      'composables'
    ]
  },

  // Modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  // Tailwind configuration
  tailwindcss: {
    exposeConfig: false,
    viewer: false
  },

  // Nuxt DevServer configuration
  devServer: {
    port: 3000
  },

  // Runtime public config for API
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'
    }
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ['chart.js']
    }
  },

  compatibilityDate: '2026-05-26'
})