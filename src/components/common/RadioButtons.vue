<template>
  <div class="flex justify-between max-w-100">
    <label :key="icon.id" v-for="icon in icons">
      <input
        class="opacity-0 absolute"
        :value="icon.value"
        name="icon"
        type="radio"
        @change="$emit('update:modelValue', icon.value)"
      />
      <component :is="icon.icon"></component>
    </label>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RadioButtons",
  components: {},
  props: {
    icons: {
      type: [Object, Array],
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
