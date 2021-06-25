<template>
  <div class="container">
    <div class="grid grid-cols-2 items-center">
      <div>Profile goes here</div>
      <div>Trip setting goes here</div>
    </div>
    <GoogleMaps />
  </div>
  <button @click="openModal">OPEN MODAL</button>
  <Modal @close-modal="closeModal" v-if="isModalOpened">
    <span class="absolute top-3 left-4">Edytuj profil</span>
    <user-info-form />
  </Modal>
</template>

<script>
import { ref } from "vue";
import GoogleMaps from "../googleMaps/GoogleMaps.vue";
import Modal from "@/components/common/Modal";
import UserInfoForm from "@/components/common/UserInfoForm";
export default {
  name: "Home",
  components: {
    GoogleMaps,
    Modal,
    UserInfoForm,
  },
  setup() {
    const isModalOpened = ref(false);
    return {
      isModalOpened,
      openModal: () => (isModalOpened.value = true),
      closeModal: () => (isModalOpened.value = false),
    };
  },
};
</script>
