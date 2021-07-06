<template>
  <div class="grid grid-cols-12 m-10 mainContainerHeight">
    <Profile
      :FFMI="FFMI"
      :lowTempo="lowTempo"
      :fastTempo="fastTempo"
      @open-modal="openModal"
      class="col-start-1 col-end-4"
    />
    <Map class="col-start-4 col-end-9 border-2" />
    <Form class="col-start-10 col-end-12" />
    <ResultList
      class="col-start-4 col-span-5 mt-24 pr-4 h-124 overflow-x-scroll"
    />
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
import ResultList from "@/components/ResultList/ResultList.vue";

export default {
  name: "Home",
  components: {
    Map,
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

<style>
.mainContainerHeight {
  --height-without-navbar: 11rem;
  height: calc(100vh - var(--height-without-navbar));
}
</style>
