<template>
  <div class="flex self-center justify-center">
    <div ref="mapContainer" class="w-220 h-144 bg-main"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  name: "Map",
  setup(props) {
    const store = useStore();
    const mapContainer = ref(null);
    onMounted(() => {
      store.dispatch("setMap", {
        initPosition: props.center,
        mapContainer: mapContainer.value,
      });
    });

    return {
      mapContainer,
    };
  },
  props: {
    center: Object,
  },
};
</script>

<style scoped></style>
