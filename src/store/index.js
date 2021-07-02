import { createStore } from "vuex";
import { SET_USER } from "@/store/mutation-types";
import { SET_ACTIVITY_OPTION } from "@/store/mutation-types";
import { routerModule } from "./routerModule";
import router from "@/router";

const store = createStore({
  state: {
    user: {
      name: "",
      lastname: "",
      height: null,
      weight: null,
      heightUnit: "cm",
      weightUnit: "kg",
      image: "",
      BMI: null,
      FFMI: null,
    },
    activityOption: {
      name: null,
      kcal: null,
    },
  },
  getters: {
    getName(state) {
      return state.user?.name;
    },
    getLastname(state) {
      return state.user?.lastname;
    },
    getHeight(state) {
      return state.user?.height;
    },
    getWeight(state) {
      return state.user?.weight;
    },
    getHeightUnit(state) {
      return state.user?.heightUnit;
    },
    getWeightUnit(state) {
      return state.user?.weightUnit;
    },
    getImage(state) {
      return state.user?.image;
    },
    getBMI(state) {
      return state.user?.BMI;
    },
    getActivityOptyion(state) {
      return state.activityOption;
    },
  },
  mutations: {
    [SET_USER](state, payload) {
      state.user = { ...state.user, ...payload };
    },
    [SET_ACTIVITY_OPTION](state, payload) {
      state.activityOption = payload;
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
