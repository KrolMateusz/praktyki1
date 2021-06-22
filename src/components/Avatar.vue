<template>
  <div class="">
    <img v-if="imgPath" :src="imgPath" alt="" class="m-1 mr-2 w-24 h-24" />
    <div
      v-if="!imgPath"
      class="
        m-1
        mr-2
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
    hover: Boolean,
  },
  setup(props) {
    function giveName() {
      console.log(props.firstName.charAt(0).toUpperCase());
      return props.firstName.charAt(0).toUpperCase();
    }
    return { giveName };
  },
};
</script>

<style>
</style>