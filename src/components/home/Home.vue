<template>
  <div class="container">
    <div class="grid grid-cols-2 items-center">
      <div>Profile goes here</div>
      <div><Button label="it works" /></div>
    </div>
    <GoogleMaps />
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from "../googleMaps/GoogleMaps.vue";
import Button from "../common/Button";

export default {
  name: "Home",
  components: {
    Button,
    GoogleMaps,
  },
};
</script>
