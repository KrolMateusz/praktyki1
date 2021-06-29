<template>
  <div class="flex justify-center w-screen">
    <div ref="googleMap" class="w-1/2 visible h-160"></div>
  </div>
</template>

<script>
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

        const request = {
          query: "Hala stulecia",
          fields: ["name"],
        };
        const service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          console.dir(results);
          console.dir(status);
        });
      } catch (e) {
        console.log(e);
      }
    });

    return { googleMap };
  },
};
</script>

<style scoped></style>
