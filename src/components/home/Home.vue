<template>
  <div class="container">
    <div class="grid grid-cols-12 items-center">
      <Profile
        :FFMI="FFMI"
        :lowTempo="lowTempo"
        :fastTempo="fastTempo"
        @open-modal="openModal"
        class="col-span-3"
      />
      <div>Trip setting goes here</div>
    </div>
    <Map :center="center" />
  </div>
  <Modal @close-modal="closeModal" v-if="isModalOpened">
    <span class="absolute top-3 left-4">Edytuj profil</span>
    <user-info-form @close-modal="closeModal" />
  </Modal>
</template>

<script>
import { ref } from "vue";
import Map from "@/components/common/Map";
import Modal from "@/components/common/Modal";
import Profile from "@/components/common/Profile.vue";
import UserInfoForm from "@/components/common/UserInfoForm";

export default {
  name: "Home",
  components: {
    Map,
    Modal,
    Profile,
    UserInfoForm,
  },
  setup() {
    const FFMI = ref(0);
    const lowTempo = ref(0.3);
    const fastTempo = ref(0.9);
    const isModalOpened = ref(false);
    const center = ref({
      lat: 51.107883,
      lng: 17.038538,
    });

    return {
      FFMI,
      lowTempo,
      fastTempo,
      isModalOpened,
      center,
      openModal: () => (isModalOpened.value = true),
      closeModal: () => (isModalOpened.value = false),
    };
  },
};
</script>
