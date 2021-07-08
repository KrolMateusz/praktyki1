<template>
  <div
    class="
      z-10
      grid
      gap-y-3.5
      grid-rows-10
      mt-16
      grid-cols-1
      lg:grid-rows-6 lg:grid-cols-12 lg:m-10
      mainContainerHeight
    "
  >
    <div class="left-0 top-0 fixed w-full z-50 h-24 bg-white lg:hidden">
      <span class="absolute left-24 top-8 text-base">LOGO</span>
      <Menu
        v-if="!isHidden"
        @click="openProfile"
        class="absolute right-0 top-4"
      />
      <Arrow
        v-if="isHidden"
        @click="openProfile"
        class="absolute right-0 top-4"
      />
    </div>
    <Profile
      :FFMI="FFMI"
      :lowTempo="lowTempo"
      :fastTempo="fastTempo"
      @open-modal="openModal"
      class="
        bg-white
        row-start-1
        z-30
        fixed
        lg:static
        w-full
        h-full
        lg:row-start-1 lg:-row-end-3 lg:col-start-1 lg:col-end-4 lg:z-0
        transition
        duration-700
      "
      :class="{
        '': isHidden,
        'transform translate-x-full lg:translate-x-0': !isHidden,
      }"
    />
    <Map
      class="
        row-start-2
        lg:col-start-4 lg:col-end-9 lg:row-start-2 lg:row-end-4
        border-2
      "
    />
    <Form
      @find-route="redrawRoute"
      class="
        m-10
        row-start-1
        lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-4
        z-20
        w-3/4
        lg:m-12
        justify-self-center
      "
    />
    <ResultList
      :restaurants="restaurants"
      @select-restaurant="selectRestaurantById"
      class="
        m-10
        z-20
        p-4
        h-96
        overflow-y-scroll
        row-start-3
        lg:m-20 lg:row-start-4 lg:row-end-7 lg:col-start-9 lg:col-end-13
      "
    />
    <div class="h-16 lg:hidden"></div>
  </div>
  <Modal @close-modal="closeModal" v-if="isModalOpened">
    <span class="absolute left-12 top-3 lg:left-4">Edytuj profil</span>
    <user-info-form @close-modal="closeModal" />
  </Modal>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useMap } from "@/composable/useMap";
import Map from "@/components/common/Map.vue";
import Profile from "@/components/common/Profile.vue";
import Modal from "@/components/common/Modal";
import UserInfoForm from "@/components/common/UserInfoForm";
import Form from "@/components/Form.vue";
import ResultList from "@/components/ResultList/ResultList.vue";
import Menu from "@/components/common/icons/menu";
import Arrow from "@/components/common/icons/arrow";

export default {
  name: "Home",
  components: {
    Map,
    Profile,
    Modal,
    UserInfoForm,
    Form,
    ResultList,
    Menu,
    Arrow,
  },
  setup() {
    const { findUserPosition, drawRouteToRestaurant } = useMap();
    const store = useStore();
    const FFMI = ref(0);

    const isHidden = ref(false);
    const openProfile = () => {
      isHidden.value = !isHidden.value;
      console.log(isHidden.value);
    };

    const isModalOpened = ref(false);
    const restaurant = reactive({ value: null });
    const restaurants = computed(() => store.getters.getRestaurants);
    const address = computed(() => store.getters.getOriginAddress);

    const redrawRoute = async () => {
      const userPosition = await findUserPosition(address.value);

      await drawRouteToRestaurant({
        originLng: userPosition.lng,
        originLat: userPosition.lat,
        destinationLng: restaurant.value.position.lng,
        destinationLat: restaurant.value.position.lat,
        transport: store.state.activityOption.transportMode,
      });
    };
    const selectRestaurantById = async (id) => {
      const userPosition = await findUserPosition(address.value);
      restaurant.value = store.getters.getRestaurantById(id);
      store.commit("setDestinationAddress", restaurant.value.address);
      await drawRouteToRestaurant({
        originLng: userPosition.lng,
        originLat: userPosition.lat,
        destinationLng: restaurant.value.position.lng,
        destinationLat: restaurant.value.position.lat,
        transport: store.state.activityOption.transportMode,
      });
    };

    return {
      FFMI,
      isHidden,
      openProfile,
      isModalOpened,
      restaurants,
      redrawRoute,
      selectRestaurantById,
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
