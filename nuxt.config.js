import colors from 'vuetify/es5/util/colors'
import messages from './plugins/i18n'

const version = Date.now();

export default {
  target: process.env.NODE_ENV === 'production' ? 'static': 'server', // default is 'server'
  server: {
    port: process.env.PORT, host: process.env.HOST
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - glroad_frontend', title: 'glroad_frontend', htmlAttrs: {lang: 'ko'},
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css',
    'animate.css/animate.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '@/plugins/v-currency-field',
    '@/plugins/persistedState.client',
    '@/plugins/common.client',
    //'@/plugins/vue2-timepicker.client'
    //{src: '@/plugins/vue-handsontable', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    //process.env.NODE_ENV !== 'production' ? ['@nuxtjs/vuetify', {treeShake: true}] : '@nuxtjs/vuetify',
    ['@nuxtjs/vuetify', {treeShake: true}],
    ['@nuxtjs/dotenv', {filename: '.env'}],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    /*'@nuxt/http',*/
    '@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/i18n', '@nuxtjs/dayjs', '@nuxtjs/proxy',
    [
      //https://github.com/phiny1/v-currency-field/issues/20#issuecomment-703135705
      //process.env.NODE_ENV !== 'production' ? 'v-currency-field/nuxt-treeshaking': 'v-currency-field/nuxt',
      'v-currency-field/nuxt-treeshaking',
      {
        locale: 'ko-KR', decimalLength: 0, autoDecimalMode: false, min: null, max: null,
        defaultValue: 0, valueAsInteger: false, allowNegative: false
      }
    ],
  ],

  router: {middleware: ['auth']},
  auth: {
    plugins: ['~/plugins/auth.js'],
    //plugins: ['~/plugins/axios.js', '~/plugins/auth.js'],
    middleware: [{src: '~/middleware/authenticated.js'}],
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        //url: 'http://localhost:8000',
        url: process.env.NODE_ENV === 'production' ? 'https://glroad.kr' : process.env.AUTH_URL,
        endpoints: {
          login: {url: '/api/login'},
          logout: {url: '/api/logout'}
        }
      }
    },
    redirect: {
      login: '/auth/login', logout: '/', callback: '/auth/login', home: '/'
    }
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ko',
    locales: [{code: 'en', name: 'English', file: 'en-US.js'}, {code: 'ko', name: '한국어', file: 'ko-KR.js'}],
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  dayjs: {
    locales: ['en', 'en'], defaultLocale: 'ko', defaultTimeZone: 'Asia/Seoul',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },

  loading: {
    color: 'blue', height: '5px'
  },

  /*http: {
    baseURL: 'http://localhost:8000/api', // Used as fallback if no runtime config is provided
  },*/

  axios: {
    //proxy: true,
    credentials: true,
    //debug: process.env.NODE_ENV !== 'production',
    //baseURL: 'http://localhost:8000/api', // Used as fallback if no runtime config is provided
    baseURL: process.env.NODE_ENV === 'production' ? 'https://glroad.kr/api' : process.env.API_URL, // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.NODE_ENV === 'production' ? 'https://glroad.kr/api' : process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //vendor: ['handsontable'],
    //https://github.com/nuxt/nuxt.js/issues/4764#issuecomment-846410863
    filenames:{
      app: ({isDev, isModern}) => isDev ? `[name]${isModern ? '.modern' : ''}.js?v=` + version : `[contenthash:7]${isModern ? '.modern' : ''}.js?v=` + version,
      chunk: ({isDev, isModern}) => isDev ? `[name]${isModern ? '.modern' : ''}.js?v=` + version : `[contenthash:7]${isModern ? '.modern' : ''}.js?v=` + version,
      css: ({isDev}) => isDev ? '[name].css?v=' + version : 'css/[contenthash:7].css?v=' + version,
      img: ({isDev}) => isDev ? '[path][name].[ext]?v=' + version : 'img/[name].[contenthash:7].[ext]?v=' + version,
      font: ({isDev}) => isDev ? '[path][name].[ext]?v=' + version : 'fonts/[name].[contenthash:7].[ext]?v=' + version,
      video: ({isDev}) => isDev ? '[path][name].[ext]?v=' + version : 'videos/[name].[contenthash:7].[ext]?v=' + version
    }
  }
}
