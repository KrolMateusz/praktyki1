export const mapModule = {
  state: () => ({
    map: null,
    distanceInM: 1000,
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
    getDistance(state) {
      return state.distanceInM;
    },
  },
};
