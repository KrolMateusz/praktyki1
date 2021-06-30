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

    const find = () => {
      const distance = 3;
      const cordLat = 51.117883;
      const cordLng = 17.038538;
      const H = window.H;
      map.value.addObject(new H.map.Marker({ lat: cordLat, lng: cordLng }));
      map.value.addObject(
        new H.map.Marker({
          lat: cordLat - distance / 100,
          lng: cordLng,
        })
      );
      map.value.addObject(
        new H.map.Marker({
          lat: cordLat + distance / 100,
          lng: cordLng,
        })
      );
      map.value.addObject(
        new H.map.Marker({
          lat: cordLat,
          lng: cordLng - distance / 100,
        })
      );
      map.value.addObject(
        new H.map.Marker({
          lat: cordLat,
          lng: cordLng + distance / 100,
        })
      );
      // const platform = new H.service.Platform({
      //   apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      // });
      // const service = platform.getSearchService();
      // service.browse(
      //   {
      //     at: "51.107883,17.038538",
      //     foodTypes: "800-057",
      //     in: "circle:51.107883,17.038538;r=8000",
      //     limit: 100,
      //   },
      //   (result) => {
      //     // Add a marker for each location found
      //     console.dir(result.items);
      //     const filteredItems = result.items.filter(
      //       (item) => item.distance > 600
      //     );
      //     filteredItems.forEach((item) => {
      //       console.log(item.position)
      //       map.value.addObject(new H.map.Marker(item.position));
      //     });
      //     console.dir(filteredItems);
      //   },
      //   alert
      // );
    };

    return {
      mapContainer,
      find,
    };
  },
};
</script>

<style scoped></style>
