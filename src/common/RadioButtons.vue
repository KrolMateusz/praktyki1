<template>
  <div class="flex items-baseline my-8">
    <label :key="index" v-for="(icon, index) in icons">
      <input class="opacity-0 absolute" name="size" type="radio" value="m" />
      <component :is="icon"></component>
    </label>
  </div>
</template>

<script>
import PizzaIcon from "./icons/pizza.vue";
import BurgerIcon from "./icons/burger.vue";
import KebabIcon from "./icons/kebab.vue";

export default {
  name: "RadioButtons",
  components: {
    PizzaIcon,
    BurgerIcon,
    KebabIcon,
  },
  setup() {
    const icons = [PizzaIcon, BurgerIcon, KebabIcon];

    return {
      icons,
    };
  },
};
</script>

<style scoped>
[type="radio"]:checked + svg {
  @apply bg-blue-300 fill-current text-white rounded-full;
}
</style>
