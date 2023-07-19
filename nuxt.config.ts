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
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "Obelcon | Home",
      meta: [{ name: "description", content: "Home Page" }],
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href: "~/assets/css/app.css",
      //   },
      //   {
      //     rel: "stylesheet",
      //     href: "~/assets/css/core.css",
      //   },
      // ],
      script: [
        // { src: "~/assets/js/jquery.min.js" },
        { src: "https://checkout.razorpay.com/v1/checkout.js" },
        // {
        //   src: "https://maps.googleapis.com/maps/api/js?key=AddKEY&callback=initMap",
        // },
      ],
    },
    // pageTransition: {
    //   name: "page",
    //   mode: "out-in",
    // },
  },
});
