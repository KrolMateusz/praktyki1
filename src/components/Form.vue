<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-y-10 flex-nowrap text-base w-full">
      <RadioButtons :icons="icons" v-model="value" />
      <div>
        <p class="font-bold">Punkt początkowy:</p>
        <TextInput label="" v-model:value="address" />
      </div>
      <div>
        <p class="font-bold">Punkt docelowy:</p>
        <p>{{ endLocation }}</p>
      </div>
      <span>{{ name }}</span>
      <Button type="submit" label="Szukaj!" />
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import RadioButtons from "@/components/common/RadioButtons";
import foodCategoryData from "@/data/foodCategory.json";
import PizzaIcon from "@/components/common/icons/pizza.vue";
import BurgerIcon from "@/components/common/icons/burger.vue";
import KebabIcon from "@/components/common/icons/kebab.vue";
import Button from "@/components/common/Button.vue";
import TextInput from "@/components/common/TextInput.vue";
import { useMap } from "@/composable/useMap";

export default {
  name: "Form",
  components: {
    RadioButtons,
    Button,
    TextInput,
  },
  setup() {
    const { findRestaurants, drawRouteToRestaurant, findUserPosition } =
      useMap();
    const value = ref("");
    const address = ref("");
    const endLocation = ref("Sky Tower");
    foodCategoryData.pizza.icon = PizzaIcon;
    foodCategoryData.burger.icon = BurgerIcon;
    foodCategoryData.kebab.icon = KebabIcon;

    const handleSubmit = async () => {
      if (!address.value) return;
      const userCords = await findUserPosition(address.value);
      await findRestaurants({
        lat: userCords.lat,
        lng: userCords.lng,
        foodType: "burger",
      });
    };
    const icons = foodCategoryData;

    return {
      icons,
      value,
      address,
      endLocation,
      findRestaurants,
      drawRouteToRestaurant,
      findUserPosition,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
