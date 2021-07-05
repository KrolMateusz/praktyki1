<template>
  <div class="flex flex-col flex-nowrap w-full">
    <RadioButtons
      :icons="icons"
      @update:modelValue="changeActivity"
      name="activityButtons"
    />
  </div>
</template>
<script>
import { useStore } from "vuex";
import RadioButtons from "@/components/common/RadioButtons";
import { SET_ACTIVITY_OPTION } from "@/store/mutation-types.js";
import activityOptionData from "@/data/activityOption.json";
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
    const changeActivity = (value) => {
      store.commit(SET_ACTIVITY_OPTION, { ...value });
    };
    activityOptionData.shoe.icon = ShoeIcon;
    activityOptionData.rollerblades.icon = RollerbladesIcon;
    activityOptionData.bicycle.icon = BicycleIcon;
    const icons = { ...activityOptionData };

    return {
      changeActivity,
      RadioButtons,
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
