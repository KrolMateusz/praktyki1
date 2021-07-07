<template>
  <span data-test="error" class="text-warning" :class="classes">{{
    message
  }}</span>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>
