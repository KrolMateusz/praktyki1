<template>
  <div>
    <div ref="mapContainer" class="w-220 h-144 bg-main"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "Map",
  props: {
    center: Object,
  },
  setup(props) {
    const mapContainer = ref(null);
    const H = window.H;

    const initalizeHereMap = (platform) => {
      const mapTypes = platform.createDefaultLayers();

      const map = new H.Map(mapContainer.value, mapTypes.vector.normal.map, {
        zoom: 14,
        center: props.center,
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, mapTypes);
      // End rendering the initial map
    };

    onMounted(() => {
      const platform = new H.service.Platform({
        apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      });
      initalizeHereMap(platform);
    });

    return {
      mapContainer,
    };
  },
};
</script>

<style scoped></style>
