<template>
  <div
    class="
      space-x-5
      justify-items-center
      mx-20
      my-10
      grid grid grid-cols-12
      items-center
    "
  >
    <Profile
      :FFMI="FFMI"
      :lowTempo="lowTempo"
      :fastTempo="fastTempo"
      @open-modal="openModal"
      class="col-start-1 col-span-2"
    />
    <GoogleMaps class="col-start-3 col-span-6" />
    <Form class="col-end-13 col-span-4"></Form>
    <ResultList class="pr-4 h-96 overflow-y-scroll col-span-4 col-end-13" />
  </div>
  <Charts class="m-20 grid justify-items-center" />
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
import Charts from "@/components/Charts/Charts.vue";
import ResultList from "@/components/ResultList/ResultList.vue";

export default {
  name: "Home",
  components: {
    Charts,
    GoogleMaps,
    Profile,
    Modal,
    UserInfoForm,
    Form,
    ResultList,
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
