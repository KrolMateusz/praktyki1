<template>
  <button
    class="bg-main rounded-sm text-white font-normal py-1 px-10 text-base"
    :class="{ 'px-40': isBig, 'bg-warning text-gray-900': isWarning }"
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
  },
};
</script>

<style scoped></style>
