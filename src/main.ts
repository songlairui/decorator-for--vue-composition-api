import VueCompositionApi from "@vue/composition-api";
import VueUI from "@vue/ui";
import "@vue/ui/dist/vue-ui.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

Vue.use(VueUI);

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
