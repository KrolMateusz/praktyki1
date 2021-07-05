<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-y-10 flex-nowrap text-base w-full">
      <ActivityButtons name="group1" />
      <RadioButtons
        :icons="icons"
        @update:modelValue="changeFoodType"
        name="group2"
      />
      <div>
        <p class="font-bold">Punkt początkowy:</p>
        <TextInput label="" v-model:value="address" />
      </div>
      <div>
        <p class="font-bold">Punkt docelowy:</p>
        <p>{{ endLocation }}</p>
      </div>
      <Button type="submit" label="Szukaj!" />
    </div>
  </form>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ActivityButtons from "@/components/common/ActivityButtons.vue";
import RadioButtons from "@/components/common/RadioButtons";
import foodCategoryData from "@/data/foodCategory.json";
import PizzaIcon from "@/components/common/icons/pizza.vue";
import BurgerIcon from "@/components/common/icons/burger.vue";
import KebabIcon from "@/components/common/icons/kebab.vue";
import Button from "@/components/common/Button.vue";
import TextInput from "@/components/common/TextInput.vue";
import { useMap } from "@/composable/useMap";
import { SET_FOOD_TYPE } from "@/store/mutation-types";

export default {
  name: "Form",
  components: {
    ActivityButtons,
    RadioButtons,
    Button,
    TextInput,
  },
  setup() {
    const { findRestaurants, drawRouteToRestaurant, findUserPosition } =
      useMap();
    const address = ref("");
    const endLocation = computed(() => store.getters.getDestinationAddress);
    foodCategoryData.pizza.icon = PizzaIcon;
    foodCategoryData.burger.icon = BurgerIcon;
    foodCategoryData.kebab.icon = KebabIcon;
    const icons = foodCategoryData;
    const store = useStore();

    const handleSubmit = async () => {
      if (!address.value) return;
      store.commit("setAddress", address.value);
      const userCords = await findUserPosition(address.value);
      await findRestaurants({
        lat: userCords.lat,
        lng: userCords.lng,
        distanceInM: 2137,
        foodType: store.state.foodType.name,
      });
    };
    const changeFoodType = (value) => {
      store.commit(SET_FOOD_TYPE, { ...value });
    };

    return {
      icons,
      address,
      endLocation,
      findRestaurants,
      drawRouteToRestaurant,
      findUserPosition,
      handleSubmit,
      changeFoodType,
    };
  },
};
</script>

<style scoped></style>
