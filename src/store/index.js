import { createStore } from "vuex";
import {
  SET_USER,
  SET_ACTIVITY_OPTION,
  SET_FOOD_TYPE,
} from "@/store/mutation-types";
import { routerModule } from "./routerModule";
import { mapModule } from "./mapModule";
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
      transportMode: "pedestrian",
      kcal: 700,
    },
    foodType: {
      name: "pizza",
      kcal: 700,
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
  },
  mutations: {
    [SET_USER](state, payload) {
      state.user = { ...state.user, ...payload };
    },
    [SET_ACTIVITY_OPTION](state, payload) {
      state.activityOption = { ...state.activityOption, ...payload };
    },
    [SET_FOOD_TYPE](state, payload) {
      state.foodType = { ...state.foodType, ...payload };
    },
  },
  actions: {},
  modules: {
    routerModule,
    mapModule,
  },
});

router.beforeEach((to, from, next) => {
  const name = to.name;
  store.commit("changeActiveRouteName", name);
  next();
});

export default store;
