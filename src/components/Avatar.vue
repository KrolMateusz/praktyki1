<template>
  <div class="group relative w-24 h-24">
    <img v-if="imgPath" :src="imgPath" alt="" class="w-24 h-24 rounded-full" />
    <div
      v-if="!imgPath"
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
      {{ giveName() }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstName: String,
    imgPath: String,
  },
  setup(props) {
    function giveName() {
      return props.firstName.charAt(0).toUpperCase();
    }
    return { giveName };
  },
};
</script>