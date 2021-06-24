export const routerModule = {
  state: () => ({
    activeRouteName: "",
  }),
  mutations: {
    changeActiveRouteName(state, value) {
      state.activeRouteName = value;
    },
  },
  actions: {},
  getters: {
    getActiveRouteName(state) {
      return state.activeRouteName;
    },
  },
};
