<template>
  <form @submit.prevent="submitDetails">
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

export default {
  name: "Form",
  components: {
    RadioButtons,
    Button,
    TextInput,
  },

  methods: {
    submitDetails() {
      console.log(this.value, this.address);
    },
  },

  setup() {
    const value = ref("");
    const address = ref("");
    const endLocation = ref("Sky Tower");
    foodCategoryData.pizza.icon = PizzaIcon;
    foodCategoryData.burger.icon = BurgerIcon;
    foodCategoryData.kebab.icon = KebabIcon;
    const icons = foodCategoryData;

    return {
      icons,
      value,
      address,
      endLocation,
    };
  },
};
</script>

<style scoped></style>
