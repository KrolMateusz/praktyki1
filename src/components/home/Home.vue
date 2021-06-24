<template>
  <div class="container">
    <div class="grid grid-cols-2 items-center">
      <div>Profile goes here</div>
      <div>Trip setting goes here</div>
    </div>
    <GoogleMaps />
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from "../googleMaps/GoogleMaps.vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
  },
};
</script>
