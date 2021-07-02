<template>
  <div class="flex self-center justify-center">
    <div ref="mapContainer" class="w-220 h-144 bg-main" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  name: "Map",
  props: {
    center: {
      type: Object,
      default: () => ({ lat: 51.107883, lng: 17.038538 }),
    },
  },
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
};
</script>

<style scoped></style>
