<template>
  <div class="group relative w-24 h-24">
    <img
      v-if="imgPath"
      :src="imgPath"
      alt=""
      class="w-24 h-24 rounded-full group-hover:opacity-50"
    />
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
        group-hover:opacity-50
      "
    >
      {{ giveName() }}
    </div>
    <button
      class="
        opacity-0
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        group-hover:opacity-100
      "
    >
      Edit profile
    </button>
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
      return props.firstName.charAt(0).toUpperCase();
    }
    return { giveName };
  },
};
</script>