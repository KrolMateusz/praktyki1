<template>
  <div class="container">
    <div class="grid grid-cols-12 items-center">
      <Profile
        :name="name"
        :lastname="lastname"
        :weight="weight"
        :height="height"
        :BMI="BMI"
        :FFMI="FFMI"
        :lowTempo="lowTempo"
        :fastTempo="fastTempo"
        class="col-span-3"
      />
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
import GoogleMaps from "@/components/googleMaps/GoogleMaps.vue";
import Profile from "@/components/common/Profile.vue";
import Modal from "@/components/common/Modal";
import UserInfoForm from "@/components/common/UserInfoForm";

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Profile,
    Modal,
    UserInfoForm,
  },
  setup() {
    const name = ref("Jan");
    const lastname = ref("Kowalski");
    const weight = ref(86);
    const height = ref(180);
    const BMI = ref(23.42);
    const FFMI = ref(null);
    const lowTempo = ref(0.3);
    const fastTempo = ref(0.9);
    const isModalOpened = ref(false);

    return {
      name,
      lastname,
      weight,
      height,
      BMI,
      FFMI,
      lowTempo,
      fastTempo,
      isModalOpened,
      openModal: () => (isModalOpened.value = true),
      closeModal: () => (isModalOpened.value = false),
    };
  },
};
</script>
