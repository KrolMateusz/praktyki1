<template>
  <div class="relative w-32 h-32">
    <img
      :src="getImage"
      alt="Your avatar"
      class="w-32 h-32 rounded-full"
      data-test="avatar-image"
      v-if="getImage"
    />
    <div
      class="
        w-32
        h-32
        relative
        flex
        justify-center
        items-center
        rounded-full
        bg-gray-500
        text-8xl text-white
        uppercase
      "
      data-test="avatar-letter"
      v-else
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
