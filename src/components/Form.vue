<template>
  <form @submit.prevent="drawRestaurantsOnMap">
    <div class="flex flex-col gap-y-10 flex-nowrap text-base w-full">
      <ActivityButtons
        :currentId="activityId"
        @find-route="$emit('findRoute')"
        name="activityButtons"
      />
      <RadioButtons
        :icons="icons"
        :currentId="foodTypeId"
        @update:modelValue="changeFoodType"
        @click="drawRestaurantsOnMap"
        name="foodTypeButtons"
      />
      <div>
        <p class="font-bold">Punkt początkowy:</p>
        <TextInput v-model:value="address" />
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
    const activityId = computed(() => store.getters.getCurrentActivityId);
    const foodTypeId = computed(() => store.getters.getFoodTypeId);

    const drawRestaurantsOnMap = async () => {
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
      foodTypeId,
      activityId,
      drawRestaurantsOnMap,
      changeFoodType,
    };
  },
};
</script>

<style scoped></style>
