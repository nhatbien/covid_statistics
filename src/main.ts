import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
/* app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBHHzALzXn6k4LScNNWdBV_InwoOXOSaFM",
    //] language: 'de',
  },
}); */
app.mount("#app");
