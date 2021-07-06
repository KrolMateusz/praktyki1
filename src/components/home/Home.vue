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
    <Map class="col-start-4 col-end-9 border-2" />
    <Form class="col-start-10 col-end-12" />
    <ResultList class="pr-4 h-96 overflow-y-scroll col-span-4 col-end-13" />
  </div>
  <Modal @close-modal="closeModal" v-if="isModalOpened">
    <span class="absolute top-3 left-4">Edytuj profil</span>
    <user-info-form @close-modal="closeModal" />
  </Modal>
</template>

<script>
import { ref } from "vue";
import Map from "@/components/common/Map.vue";
import Profile from "@/components/common/Profile.vue";
import Modal from "@/components/common/Modal";
import UserInfoForm from "@/components/common/UserInfoForm";
import Form from "@/components/Form.vue";
import ActivityButtons from "@/components/common/ActivityButtons.vue";
import ResultList from "@/components/ResultList/ResultList.vue";

export default {
  name: "Home",
  components: {
    Map,
    Profile,
    Modal,
    UserInfoForm,
    Form,
    ActivityButtons,
    ResultList,
  },
  setup() {
    const FFMI = ref(0);

    const isModalOpened = ref(false);

    return {
      FFMI,

      isModalOpened,
      openModal: () => (isModalOpened.value = true),
      closeModal: () => (isModalOpened.value = false),
    };
  },
};
</script>
