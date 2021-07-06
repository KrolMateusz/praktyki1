import { createStore } from "vuex";
import {
  SET_USER,
  SET_ACTIVITY_OPTION,
  SET_FOOD_TYPE,
  SET_KCAL_BURNED,
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
      id: 0,
      type: "walking",
      transportMode: "pedestrian",
      kcal: 700,
    },
    foodType: {
      id: 0,
      name: "pizza",
      kcal: 700,
    },
    kcalBurned: {
      walking: null,
      skating: null,
      cycling: null,
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
    getKcalBurned(state) {
      return state.kcalBurned;
    },
    getActivityOptionType(state) {
      return state.activityOption.type;
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
    [SET_KCAL_BURNED](state, payload) {
      state.kcalBurned = { ...state.kcalBurned, ...payload };
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
