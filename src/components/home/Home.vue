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
      :restaurants="restaurants"
      @select-restaurant="selectRestaurant"
      class="pr-4 h-96 overflow-y-scroll col-span-4 col-end-13"
    />
  </div>
  <Modal @close-modal="closeModal" v-if="isModalOpened">
    <span class="absolute top-3 left-4">Edytuj profil</span>
    <user-info-form @close-modal="closeModal" />
  </Modal>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useMap } from "@/composable/useMap";
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
    const { findUserPosition, drawRouteToRestaurant } = useMap();
    const store = useStore();
    const FFMI = ref(0);
    const lowTempo = ref(0.3);
    const fastTempo = ref(0.9);
    const isModalOpened = ref(false);
    const restaurants = computed(() => store.getters.getRestaurants);
    const address = computed(() => store.getters.getOriginAddress);

    const selectRestaurant = async (index) => {
      const userPosition = await findUserPosition(address.value);
      const restaurant = store.getters.getRestaurantById(index);
      await drawRouteToRestaurant({
        originLng: userPosition.lng,
        originLat: userPosition.lat,
        destinationLng: restaurant.position.lng,
        destinationLat: restaurant.position.lat,
        transport: store.state.activityOption.transportMode,
      });
    };

    return {
      FFMI,
      lowTempo,
      fastTempo,
      isModalOpened,
      restaurants,
      selectRestaurant,
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
