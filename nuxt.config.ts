// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    dburl: process.env.DAATABASE_URL,
    dbName: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    pass: process.env.DBPASSWORD,
    authSource: process.env.DBAUTHSOURCE,
  },
  imports: {
    dirs: ["composables/**"],
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});
