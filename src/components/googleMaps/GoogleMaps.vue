<template>
  <div class="flex justify-center w-screen">
    <div ref="googleMap" class="w-1/2 visible h-160"></div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "GoogleMaps",
  setup() {
    const googleMap = ref(null);

    return {
      googleMap,
    };
  },
};
</script>

<style scoped></style>
