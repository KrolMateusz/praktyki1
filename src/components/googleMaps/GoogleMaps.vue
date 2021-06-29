<template>
  <div class="flex justify-center w-screen">
    <div ref="googleMap" class="w-1/2 visible h-160"></div>
  </div>
</template>

<script>
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref } from "vue";
export default {
  name: "GoogleMaps",
  setup() {
    const googleMap = ref(null);
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      libraries: ["drawing", "geometry", "places", "visualization"],
      version: "weekly",
      region: "PL",
    });

    onMounted(async () => {
      try {
        const mapOptions = {
          center: { lat: 51.107883, lng: 17.038538 },
          zoom: 14,
          region: "PL",
        };
        const google = await loader.load();
        const map = new google.maps.Map(googleMap.value, mapOptions);
        console.dir(map);
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum&key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`
          )
          .then((res) => console.dir(res));
      } catch (e) {
        console.log(e);
      }
    });

    return { googleMap };
  },
};
</script>

<style scoped></style>
