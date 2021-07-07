import { createStore } from "vuex";
import { auth, users } from "../firebase";
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
      userAuthData: null,
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
    getCurrentActivityId(state) {
      return state.activityOption.id;
    },
    getFoodTypeId(state) {
      return state.foodType.id;
    },
    getKcalBurned(state) {
      return state.kcalBurned;
    },
    getActivityOptionType(state) {
      return state.activityOption.type;
    },
    getUserAuthData(state) {
      return state.userAuthData;
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
    setUserAuth(state, payload) {
      state.userAuthData = { ...state.userAuthData, ...payload };
    },
  },
  actions: {
    async login({ dispatch }, { email, password }) {
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, { name, surname, email, password }) {
      console.log(name, surname, email, password);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await users.doc(user.uuid).set({
        name,
        surname,
      });
      dispatch("fetchUserProfile", user);
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await users.doc(user.uuid).get();
      commit("setUserAuth", userProfile.data());
      router.push("/");
    },
  },
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
