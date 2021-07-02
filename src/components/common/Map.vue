<template>
  <div class="flex self-center justify-center">
    <div ref="mapContainer" class="w-220 h-144 bg-main"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import H from "@here/maps-api-for-javascript";

export default {
  name: "Map",
  setup(props) {
    const store = useStore();
    const mapContainer = ref(null);

    const initializeHereMap = (platform) => {
      const mapTypes = platform.createDefaultLayers();

      const Map = new H.Map(mapContainer.value, mapTypes.vector.normal.map, {
        zoom: 14,
        center: props.center,
      });

      addEventListener("resize", () => Map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(Map));

      // add UI
      H.ui.UI.createDefault(Map, mapTypes);
      // End rendering the initial map
      // store.dispatch("setMap", map.value)
      store.commit("setMap", Map);
    };

    onMounted(async () => {
      const platform = new H.service.Platform({
        apiKey: process.env.VUE_APP_API_KEY,
      });
      initializeHereMap(platform);
    });

    return {
      mapContainer,
    };
  },
  props: {
    center: Object,
  },
};
</script>

<style scoped></style>
