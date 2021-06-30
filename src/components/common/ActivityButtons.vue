<template>
  <div class="flex flex-col flex-nowrap w-full">
    <RadioButtons
      @change="$emit('update:modelValue', value)"
      v-model="value"
      :icons="icons"
    />
  </div>
</template>
<script>
import RadioButtons from "@/components/common/RadioButtons";
import ShoeIcon from "@/components/common/icons/shoe.vue";
import RollerbladesIcon from "@/components/common/icons/rollerblades.vue";
import BicycleIcon from "@/components/common/icons/bicycle.vue";
import { ref } from "vue";

export default {
  name: "ActivityButtons",
  components: {
    RadioButtons,
  },
  setup() {
    const value = ref({
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
    const funkcja = () => {
      console.log(value.value);
    };

    return {
      RadioButtons,
      value,
      icons,
      funkcja,
    };
  },
};
</script>

<style scoped>
[type="radio"]:checked + svg {
  @apply bg-main fill-current text-white rounded-full;
}
</style>
