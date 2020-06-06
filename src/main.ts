import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
