<template>
  <fieldset class="flex justify-between max-w-100" :id="name">
    <label :key="icon.id" v-for="icon in icons">
      <input
        :checked="icon.id === 0"
        :value="icon.value"
        @change="$emit('update:modelValue', icon.value)"
        class="opacity-0 absolute"
        :name="name"
        type="radio"
      />
      <component :is="icon.icon" />
    </label>
  </fieldset>
</template>

<script>
export default {
  name: "RadioButtons",
  props: {
    icons: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
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
