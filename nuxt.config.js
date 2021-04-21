export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ACLC Bukidnon",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/bnhs-logo-128.png" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",

    "@nuxtjs/auth-next",

    "@nuxtjs/proxy",

    "@nuxtjs/markdownit"
  ],

  markdownit: {
    runtime: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   proxy: true,
  //   debug: true
  // },
  // axios: {
  //   proxy: true
  // },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8000',
  //     pathRewrite: { '^/api': '' }
  //   }
  // },

  buefy: {
    css: false
  },

  axios: {
    baseURL: "https://ict-server.herokuapp.com/"
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    middleware: ["auth"]
  },
  auth: {
    strategies: {
      local: {
        user: {
          property: false // <--- Default "user"
        },
        endpoints: {
          login: { url: "/auth", method: "post", propertyName: "token" },
          user: { url: "/auth", method: "get", propertyName: false },
          logout: true
        }
      }
    }
  }
};
