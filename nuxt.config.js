import colors from 'vuetify/es5/util/colors'

export default {
  loading: '~/components/Loading.vue',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - bloom',
    title: 'bloom',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/lazy', ssr: false, mode: 'client' },
    { src: '~plugins/disqus' },
    { src: '~plugins/video', mode: 'client' },
    { src: '~/plugins/virtual-coll', ssr: true },
    { src: '~/plugins/timer', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/proxy',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',

    '@nuxtjs/auth',
    '@nuxtjs/google-analytics',
    'vue-scrollto/nuxt'
  ],

  router: {
    routes: [
      {
        name: 'album-id',
        path: '/a/:id?',
        component: 'pages/a/_id.vue'
      }
    ]
  },

  googleAnalytics: {
    id: 'UA-181726450-1'
  },

  auth: {
    redirect: {
      login: '/', // redirect user when not connected
      callback: '/auth/signed-in'
    },
    strategies: {
      local: false,
      auth0: {
        domain: 'hina.eu.auth0.com',
        client_id: 'ogbETWao1GnRRYE7yzl5ZzD1ZMGbxD5q',
        audience: 'https://hina.eu.auth0.com/api/v2/'
      }
    }
  },

  oneSignal: {
    init: {
      appId: '669e9631-22a6-4f83-bb42-8665ec81fa85',
      allowLocalhostAsSecureOrigin: true,
      requiresUserPrivacyConsent: false,
      autoResubscribe: false,
      welcomeNotification: {
        disable: true
      },
      autoRegister: true
    },

    // Use CDN
    cdn: true,

    // Use any custom URL
    OneSignalSDK: 'https://cdn.discordapp.com/attachments/488810702190936075/772335011407986718/OneSignalSDK.js'
  },

  pwa: {
    manifest: {
      name: 'Bloom - Hina',
      lang: 'en',
      useWebmanifestExtension: false
    },
    workbox: {
      autoRegister: true,
      dev: false,
      clientsClaim: true,
      skipWaiting: true,
      offlineAnalytics: false,
      cleanupOutdatedCaches: true,
      cacheAssets: true,

      runtimeCaching: [
        {
          urlPattern: 'https://app.ixil.cc/api/bloom/strat/lazy/random.*',
          strategyOptions: {
            cacheName: 'random-lazy'
          },
          strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 1,
              maxAgeSeconds: 10
            }
          }]
        }
      ]
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  proxy: {
    '/api': {
      target: 'https://api.ixil.cc',
      pathRewrite: {
        '^/api': '/'
      },
      headers: { client: 'Bloom-Official' }  // for analytics
    },
    '/prox': {
      target: 'https://proxy.ixil.cc',
      pathRewrite: {
        '^/prox': '/'
      }
    }
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
