<template>
  <div :class="selectedPositionClass" class="fixed" v-if="isToastDisplayed">
    <div
      :class="selectedTypeClass"
      class="px-20 py-7 rounded-2xl shadow text-base"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "Toast",
  props: {
    position: {
      type: String,
      default: "top-center",
      validator(value) {
        return [
          "top-right",
          "top-center",
          "top-left",
          "bottom-right",
          "bottom-center",
          "bottom-left",
        ].includes(value);
      },
    },
    type: {
      type: String,
      default: "info",
      validator(value) {
        return ["success", "info", "error"].includes(value);
      },
    },
    durationInSeconds: {
      type: Number,
      default: 5,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const positionClasses = new Map([
      ["top-right", "top-12 right-12"],
      ["top-center", "top-12 left-1/2"],
      ["top-left", "top-12 left-12"],
      ["bottom-right", "bottom-12 right-12"],
      ["bottom-center", "bottom-12 left-1/2"],
      ["bottom-left", "bottom-12 left-12"],
    ]);
    const typeClasses = new Map([
      ["info", "bg-blue-600 text-white"],
      ["success", "bg-green-500"],
      ["error", "bg-warning"],
    ]);
    const selectedPositionClass = computed(() =>
      positionClasses.get(props.position)
    );
    const selectedTypeClass = computed(() => typeClasses.get(props.type));
    const isToastDisplayed = ref(props.show);
    setTimeout(
      () => (isToastDisplayed.value = false),
      props.durationInSeconds * 1000
    );

    return {
      selectedPositionClass,
      selectedTypeClass,
      isToastDisplayed,
    };
  },
};
</script>

<style scoped></style>
