<template>
  <button
    :class="{ 'px-40': isBig, 'bg-warning text-gray-900': isWarning }"
    :type="type"
    data-test="button"
    class="
      flex
      justify-center
      items-center
      bg-main
      rounded-sm
      text-white
      font-normal
      py-1
      px-10
      text-base
    "
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      required: true,
    },
    isBig: {
      type: Boolean,
      default: false,
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style scoped></style>
