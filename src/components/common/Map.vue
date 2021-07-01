<template>
  <div class="flex self-center justify-center">
    <div ref="mapContainer" class="w-220 h-144 bg-main"></div>
    <button @click="find">SZUKAJ</button>
  </div>
</template>

<script>
import axios from "axios";
import pizza from "@/components/common/icons/pizza.svg";
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
    const distanceInKm = 3;
    const radiusInKm = 1;

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

    const calculateCords = (start) => {
      const cords = [];
      for (const distance of [
        (distanceInKm + radiusInKm) / 100,
        -(distanceInKm + radiusInKm) / 100,
      ]) {
        cords.push(
          {
            lat: start.lat - distance,
            lng: start.lng,
          },
          {
            lat: start.lat,
            lng: start.lng - distance,
          },
          {
            lat: start.lat - distance,
            lng: start.lng - distance,
          },
          {
            lat: start.lat + distance,
            lng: start.lng - distance,
          }
        );
      }
      return cords;
    };

    const find = () => {
      const pizzaIcon = new H.map.Icon(pizza, { size: { w: 20, h: 20 } });
      const originLat = 51.117883;
      const originLng = 17.038538;
      const cords = calculateCords(
        { lat: originLat, lng: originLng },
        distanceInKm
      );
      const createBrowseQueryUrls = ({ lat, lng }) =>
        `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&foodTypes=800-057&in=circle:${lat},${lng};r=${
          radiusInKm * 1000
        }&limit=20&apiKey=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
      const browseUrls = cords.map(createBrowseQueryUrls);
      const fetchData = (url) => axios.get(url);
      const restaurants = [];
      const browseActions = browseUrls.map(fetchData);

      Promise.all(browseActions).then((result) => {
        const places = result.map((item) => item.data.items).flat();
        for (const place of places) {
          console.log(place);
          restaurants.push({
            name: place.title,
            address: place.address,
            openingHours: place.openingHours
              ? place.openingHours[0].text
              : null,
            position: place.position,
          });
        }
        console.log("RESTAURACJE", restaurants);
        restaurants.forEach((item) => {
          map.value.addObject(
            new H.map.Marker(item.position, { icon: pizzaIcon })
          );
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
