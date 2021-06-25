<template>
  <div>
    <div ref="googleMap" class="map">Google API goes here</div>
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

    onMounted(() => {
      loader
        .load()
        .then((google) => {
          new google.maps.Map(googleMap.value, mapOptions);
        })
        .catch((err) => console.log(err));
    });

    return { googleMap };
  },
};
</script>

<style scoped>
.map {
  height: 500px;
  width: 500px;
  overflow: visible;
}
</style>
