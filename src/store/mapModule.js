export const mapModule = {
  state: () => ({
    map: null,
  }),
  mutations: {
    setMap(state, payload) {
      state.map = payload;
    },
  },
  actions: {
    setMap({ state, commit }, payload) {
      if (!state.map) {
        const newPayload = { ...payload };
        commit("setMap", newPayload);
        return;
      }

      if (state.map) {
        return;
      }
    },
  },
  getters: {
    getMap(state) {
      return state.map;
    },
  },
};
