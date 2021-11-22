<template>
  <transition name="toast">
    <div :class="position" class="fixed" v-if="isToastDisplayed">
      <div :class="type" class="px-20 py-7 rounded-2xl shadow text-base">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watch } from "vue";

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
    const isToastDisplayed = ref(props.show);
    let timeout;

    watch(
      () => props.show,
      (show) => {
        clearTimeout(timeout);
        isToastDisplayed.value = show;
        timeout = setTimeout(
          () => (isToastDisplayed.value = false),
          props.durationInSeconds * 1000
        );
      }
    );

    return {
      isToastDisplayed,
    };
  },
};
</script>

<style scoped>
.top-right {
  @apply top-12 right-12;
}

.top-center {
  @apply top-12 left-1/2;
}

.top-left {
  @apply top-12 left-12;
}

.bottom-right {
  @apply bottom-12 right-12;
}

.bottom-center {
  @apply bottom-12 left-1/2;
}

.bottom-left {
  @apply bottom-12 left-12;
}

.info {
  @apply bg-blue-600 text-white;
}

.success {
  @apply bg-green-500;
}

.error {
  @apply bg-warning;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease-in-out;
}

.toast-leave-to,
.toast-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
