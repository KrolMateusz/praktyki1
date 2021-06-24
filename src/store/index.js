import { createStore } from "vuex";
import { routerModule } from "./routerModule";
import router from "@/router";
import { DISPLAY_MODAL, HIDE_MODAL, SET_USER } from "./mutation-types";

const store = createStore({
  state: {
    isModalDisplayed: true,
    user: {
      name: "",
      lastname: null,
      height: null,
      weight: null,
      heightUnit: "cm",
      weightUnit: "kg",
    },
  },
  getters: {
    getName(state) {
      return state.user.name;
    },
    getLastname(state) {
      return state.user.lastname;
    },
    getHeight(state) {
      return state.user.height;
    },
    getWeight(state) {
      return state.user.weight;
    },
    getHeightUnit(state) {
      return state.user.heightUnit;
    },
    getWeightUnit(state) {
      return state.user.weightUnit;
    },
  },
  mutations: {
    [DISPLAY_MODAL](state) {
      state.isModalDisplayed = true;
    },
    [HIDE_MODAL](state) {
      state.isModalDisplayed = false;
    },
    [SET_USER](state, payload) {
      state.user = { ...state.user, ...payload };
    },
  },
  actions: {},
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
