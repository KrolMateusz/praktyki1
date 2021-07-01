<template>
  <div class="grid grid-cols-12 space-y-12 mx-10 my-10">
    <ActivityButtons class="col-start-4 col-span-4 mx-14" />
    <Profile
      :FFMI="FFMI"
      :lowTempo="lowTempo"
      :fastTempo="fastTempo"
      @open-modal="openModal"
      class="col-start-1 col-end-4"
    />
    <GoogleMaps class="col-start-4 col-end-9 border-2" />
    <Form class="col-start-10 col-end-12" />
  </div>
  <Modal @close-modal="closeModal" v-if="isModalOpened">
    <span class="absolute top-3 left-4">Edytuj profil</span>
    <user-info-form @close-modal="closeModal" />
  </Modal>
</template>

<script>
import { ref } from "vue";
import GoogleMaps from "@/components/googleMaps/GoogleMaps.vue";
import Profile from "@/components/common/Profile.vue";
import Modal from "@/components/common/Modal";
import UserInfoForm from "@/components/common/UserInfoForm";
import Form from "@/components/Form.vue";
import ActivityButtons from "@/components/common/ActivityButtons.vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Profile,
    Modal,
    UserInfoForm,
    Form,
    ActivityButtons,
  },
  setup() {
    const FFMI = ref(0);
    const lowTempo = ref(0.3);
    const fastTempo = ref(0.9);
    const isModalOpened = ref(false);

    return {
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
