<template>
  <div class="group relative w-24 h-24">
    <img
      v-if="getImage"
      :src="getImage"
      alt="Your avatar"
      class="w-24 h-24 rounded-full"
    />
    <div
      v-else
      class="
        w-24
        h-24
        relative
        flex
        justify-center
        items-center
        rounded-full
        bg-gray-500
        text-6xl text-white
        uppercase
      "
    >
      {{ getName }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    firstName: {
      String,
      required: true,
    },
    imgPath: {
      String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const getName = computed(() => props.firstName.charAt(0).toUpperCase());
    const getImage = computed(() => props.imgPath);

    return {
      getName,
      getImage,
    };
  },
};
</script>