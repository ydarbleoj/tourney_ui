import { createApp } from "vue";
import App from "./App.vue";

import http from "./plugins/http";
import router from "./router";
import store from "./store";
import ActionCableVue from "actioncable-vue";

import auth from "./plugins/auth.js";
import vuetify from "./plugins/vuetify";

import "./assets/main.css"
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;
const actionCableVueOptions = {
  debug: true,
  debugLevel: "error",
  connectionUrl: "ws://localhost:3000/cable",
  connectImmediately: true,
};

const app = createApp(App);
app.use(http);
app.use(store);
app.use(router);
app.use(vuetify);
app.use(auth);
app.use(ActionCableVue, actionCableVueOptions)
app.mount("#app");
