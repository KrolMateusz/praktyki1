<template>
  <div class="flex justify-between max-w-100">
    <label :key="icon.id" v-for="icon in icons">
      <input
        :value="icon.value"
        @change="$emit('update:modelValue', icon.value)"
        class="opacity-0 absolute"
        name="icon"
        type="radio"
      />
      <component :is="icon.icon" />
    </label>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RadioButtons",
  props: {
    icons: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const name = ref("max");

    return {
      name,
    };
  },
};
</script>

<style scoped>
[type="radio"]:checked + svg {
  @apply bg-main fill-current text-white rounded-full;
}
</style>
