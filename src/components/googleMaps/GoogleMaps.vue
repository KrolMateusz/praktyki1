<template>
  <div class="flex justify-center w-screen">
    <div ref="googleMap" class="w-1/2 visible h-96">Google API goes here</div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref } from "vue";
export default {
  name: "GoogleMaps",
  setup() {
    const mapOptions = {
      center: {
        lat: 54,
        lng: 12,
      },
      zoom: 4,
    };

    const googleMap = ref(null);
    const loader = new Loader({
      apiKey: "AIzaSyBk1HDrCjUgyVzhowW85akNFEVwygpNNDY",
      libraries: ["places"],
      version: "weekly",
    });

    onMounted(async () => {
      try {
        const google = await loader.load();
        new google.maps.Map(googleMap.value, mapOptions);
      } catch (e) {
        console.log(e);
      }
    });

    return { googleMap };
  },
};
</script>

<style scoped></style>
