<template>
  <div class="flex flex-col flex-nowrap w-full">
    <RadioButtons
      :icons="icons"
      @change="$emit('update:modelValue', value)"
      v-model="value"
    />
    <span>{{ value }}</span>
  </div>
</template>
<script>
import { reactive } from "vue";
import RadioButtons from "@/components/common/RadioButtons";
import ShoeIcon from "@/components/common/icons/shoe.vue";
import RollerbladesIcon from "@/components/common/icons/rollerblades.vue";
import BicycleIcon from "@/components/common/icons/bicycle.vue";

export default {
  name: "ActivityButtons",
  components: {
    RadioButtons,
  },
  setup() {
    const value = reactive({
      name: "",
      kcal: null,
    });
    const icons = {
      shoe: {
        id: 1,
        icon: ShoeIcon,
        value: {
          name: "shoe",
          kcal: 700,
        },
      },
      rollerblades: {
        id: 2,
        icon: RollerbladesIcon,
        value: {
          name: "rollerblades",
          kcal: 500,
        },
      },
      bicycle: {
        id: 3,
        icon: BicycleIcon,
        value: {
          name: "bicycle",
          kcal: 400,
        },
      },
    };

    return {
      RadioButtons,
      value,
      icons,
    };
  },
};
</script>

<style scoped>
[type="radio"]:checked + svg {
  @apply bg-main fill-current text-white rounded-full;
}
</style>
