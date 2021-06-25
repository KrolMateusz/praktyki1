import { createStore } from "vuex";
import { routerModule } from "./routerModule";
import router from "@/router";

const store = createStore({
  modules: {
    routerModule,
  },
});

router.beforeEach((to, from, next) => {
  const name = to.name;
  store.commit("changeActiveRouteName", name);
  next();
});

export default store;
