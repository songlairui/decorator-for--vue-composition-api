import { defineComponent, reactive } from "@vue/composition-api";
import ROUTES from "vue-auto-routing";
import "./App.less";
console.info("ROUTES", ROUTES);

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      count: 0,
    });
    const routes = reactive([
      ...ROUTES.map((item) => ({ path: item.path, name: item.name })),
    ]);
    console.info("routes", routes);
    return () => (
      <div id="app" ref="root">
        <div id="nav">
          {routes.map((item) => (
            <router-link to={`/${item.path}`}>
              {item.name || item.path}
            </router-link>
          ))}
          {state.count}
        </div>
        <router-view />
      </div>
    );
  },
});
