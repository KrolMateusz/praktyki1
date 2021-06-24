<template>
  <div className="container">
    <div className="grid grid-cols-2 items-center">
      <div>Profile goes here</div>
      <div>Trip setting goes here</div>
    </div>
    <GoogleMaps />
  </div>
  <Modal v-if="isModalDisplayed" />
</template>

<script>
import GoogleMaps from "../googleMaps/GoogleMaps.vue";
import Modal from "@/components/common/Modal";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Modal,
  },
  setup() {
    const store = useStore();

    return {
      isModalDisplayed: computed(() => store.state.isModalDisplayed),
    };
  },
};
</script>
