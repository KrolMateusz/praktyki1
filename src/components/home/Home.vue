<template>
  <div class="container">
    <div class="grid grid-cols-2 items-center">
      <div>Profile goes here</div>
      <div>Trip setting goes here</div>
    </div>
    <TravelMap />
  </div>
</template>

<script>
// @ is an alias to /src
import TravelMap from "../googleMaps/TravelMap.vue";

export default {
  name: "Home",
  components: {
    TravelMap,
  },
};
</script>
