<template>
  <div class="flex self-center justify-center">
    <div ref="mapContainer" class="w-220 h-144 bg-main"></div>
    <button @click="find">SZUKAJ</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "Map",
  props: {
    center: Object,
  },
  setup(props) {
    const store = useStore();
    const mapContainer = ref(null);
    const H = window.H;

    const initializeHereMap = (platform) => {
      const mapTypes = platform.createDefaultLayers();

      const Map = new H.Map(mapContainer.value, mapTypes.vector.normal.map, {
        zoom: 14,
        center: props.center,
      });

      console.log(Map);

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
      // const H = window.H;

      const distance = 2;
      const originLat = 51.117883;
      const originLng = 17.038538;
      const cords = calculateCords(
        { lat: originLat, lng: originLng },
        distance
      );
      const createBrowseQueryUrls = ({ lat, lng }) =>
        `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&foodTypes=800-057&circle:${lat},${lng};r=${
          distance * 1000
        }&limit=5&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
      const createRouteQueryUrls = (restaurant) =>
        `https://router.hereapi.com/v8/routes?transportMode=pedestrian&origin=${originLat},${originLng}&destination=${restaurant.position.lat},${restaurant.position.lng}&return=travelSummary&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
      const browseUrls = cords.map(createBrowseQueryUrls);

      const fetchData = (url) => axios.get(url);
      const browseActions = browseUrls.map(fetchData);
      Promise.all(browseActions).then((result) => {
        const restaurants = result.map((item) => item.data.items).flat();
        const routeUrls = restaurants.map(createRouteQueryUrls);
        const routeActions = routeUrls.map(fetchData);
        Promise.all(routeActions).then((response) => {
          console.dir(response);
          const filteredRestaurants = response.filter(
            ({ data }) =>
              data.routes[0].sections[0].travelSummary.length >= distance * 1000
          );
          console.dir(filteredRestaurants);
        });
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
