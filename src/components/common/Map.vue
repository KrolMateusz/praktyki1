<template>
  <div class="flex self-center justify-center">
    <div ref="mapContainer" class="w-220 h-144 bg-main"></div>
    <button @click="find">SZUKAJ</button>
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
    const map = ref(null);

    const initializeHereMap = (platform) => {
      const mapTypes = platform.createDefaultLayers();

      map.value = new H.Map(mapContainer.value, mapTypes.vector.normal.map, {
        zoom: 14,
        center: props.center,
      });

      addEventListener("resize", () => map.value.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map.value));

      // add UI
      H.ui.UI.createDefault(map, mapTypes);
      // End rendering the initial map
    };

    onMounted(async () => {
      const platform = new H.service.Platform({
        apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      });
      initializeHereMap(platform);
    });

    const calculateCords = (start, distance) => {
      const cords = [];
      for (const lat of [distance / 100, -distance / 100]) {
        cords.push(
          {
            lat: start.lat - lat,
            lng: start.lng,
          },
          {
            lat: start.lat,
            lng: start.lng - lat,
          }
        );
      }
      return cords;
    };

    const find = () => {
      const H = window.H;
      const platform = new H.service.Platform({
        apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      });
      const searchService = platform.getSearchService();

      const distance = 2;
      const cordLat = 51.117883;
      const cordLng = 17.038538;
      const cords = calculateCords({ lat: cordLat, lng: cordLng }, distance);

      cords.forEach((item) => {
        searchService.browse(
          {
            at: `${item.lat},${item.lng}`,
            foodTypes: "800-057",
            in: `circle:${item.lat},${item.lng};r=${distance * 1000}`,
            limit: 10,
          },
          (result) => {
            console.dir(result.items);
            const properCords = result.items.forEach((item) =>
              console.log(item.position)
            );
            console.dir(properCords);
            result.items.forEach((item) => {
              map.value.addObject(new H.map.Marker(item.position));
            });
          },
          alert
        );
      });
    };

    return {
      mapContainer,
      find,
    };
  },
};
</script>

<style scoped></style>
