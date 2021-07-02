import H from "@here/maps-api-for-javascript";

export const mapModule = {
  state: () => ({
    map: null,
    distanceInM: 1000,
  }),
  mutations: {
    setMap(state, payload) {
      state.map = payload.map;
    },
  },
  actions: {
    setMap({ commit }, { initPosition, mapContainer }) {
      try {
        const platform = new H.service.Platform({
          apikey: process.env.VUE_APP_API_KEY,
        });

        const mapTypes = platform.createDefaultLayers();
        const map = new H.Map(mapContainer, mapTypes.vector.normal.map, {
          zoom: 14,
          center: initPosition,
        });
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        H.ui.UI.createDefault(map, mapTypes);
        commit("setMap", { map });
      } catch (e) {
        throw new Error(e);
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
