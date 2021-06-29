<template>
  <form @submit.prevent="submitDetails">
    <div class="flex flex-col gap-y-10 flex-nowrap text-base w-full">
      <RadioButtons v-model="value" :icons="icons" />
      <div>
        <p class="font-bold">Punkt początkowy:</p>
        <TextInput v-model:value="address"></TextInput>
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
import RadioButtons from "@/components/common/RadioButtons";
import PizzaIcon from "@/components/common/icons/pizza.vue";
import BurgerIcon from "@/components/common/icons/burger.vue";
import KebabIcon from "@/components/common/icons/kebab.vue";
import Button from "@/components/common/Button.vue";
import TextInput from "@/components/common/TextInput.vue";
import { ref } from "vue";

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

    const icons = {
      pizza: {
        id: 1,
        icon: PizzaIcon,
        value: 1000,
      },
      burger: {
        id: 2,
        icon: BurgerIcon,
        value: 600,
      },
      kebab: {
        id: 3,
        icon: KebabIcon,
        value: 800,
      },
    };

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
