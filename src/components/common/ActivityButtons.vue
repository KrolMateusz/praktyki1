<template>
  <div class="flex flex-col flex-nowrap w-full">
    <RadioButtons :icons="icons" @update:modelValue="changeActivity" />
    <span>{{ activityOption }}</span>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import RadioButtons from "@/components/common/RadioButtons";
import { SET_ACTIVITY_OPTION } from "@/store/mutation-types.js";
import ShoeIcon from "@/components/common/icons/shoe.vue";
import RollerbladesIcon from "@/components/common/icons/rollerblades.vue";
import BicycleIcon from "@/components/common/icons/bicycle.vue";

export default {
  name: "ActivityButtons",
  components: {
    RadioButtons,
  },
  setup() {
    const store = useStore();
    const activityOption = computed(() => store.state.activityOption);
    const changeActivity = (value) => {
      console.log(value);
      store.commit(SET_ACTIVITY_OPTION, value);
    };
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
      changeActivity,
      RadioButtons,
      activityOption,
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
