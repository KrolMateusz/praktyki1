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
        @open-modal="openModal"
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
import { useStore } from "vuex";
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
    const store = useStore();
    const name = ref(store.getters.getName);
    const lastname = ref(store.getters.getLastname);
    const weight = ref(store.getters.getWeight);
    const height = ref(store.getters.getHeight);
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
