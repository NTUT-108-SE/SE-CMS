import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Toasted from "vue-toasted";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Component } from "vue-property-decorator";

Vue.config.productionTip = false;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Vue.use(VueAxios, axios);
Vue.use(Toasted, {
  theme: "outline",
  iconPack: "mdi"
});

Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
