export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'demo_nuxt',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["nuxt-i18n"],

  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "zh",
    vueI18n: {
      fallbackLocale: "zh",
      messages: {
        zh: {
          lang: "zh",
          switch: "EN",
          links: {
            index: "首页",
            about: "简介",
            news: "新闻"
          }
        },
        en: {
          lang: "en",
          switch: "中",
          links: {
            index: "HOME",
            about: "ABOUT",
            news: "NEWS"
          }
        }
      }
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
