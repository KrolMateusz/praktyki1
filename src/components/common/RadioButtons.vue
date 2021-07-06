<template>
  <div class="flex justify-between max-w-100">
    <label :key="icon.id" class="cursor-pointer" v-for="icon in icons">
      <input
        :checked="icon.id === 0"
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
export default {
  name: "RadioButtons",
  props: {
    icons: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
[type="radio"]:checked + svg {
  @apply bg-main fill-current text-white rounded-full;
}
</style>
