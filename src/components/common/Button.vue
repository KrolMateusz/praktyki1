<template>
  <button
    class="bg-main rounded-sm text-white font-normal py-1 px-10 text-base"
    :class="bindClasses()"
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
  setup(props) {
    const bindClasses = () => {
      const classes = [];
      if (props.isBig) {
        classes.push("px-40");
      }

      if (props.isWarning) {
        classes.push("bg-warning text-gray-900");
      }

      return classes;
    };
    return {
      bindClasses,
    };
  },
};
</script>

<style scoped></style>
