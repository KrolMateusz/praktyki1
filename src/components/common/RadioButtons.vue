<template>
  <fieldset class="flex justify-between max-w-100">
    <label
      :key="icon.id"
      class="cursor-pointer"
      :id="name"
      v-for="icon in icons"
    >
      <input
        :checked="icon.value.id === currentId"
        :value="icon.value"
        :name="name"
        @change="$emit('update:modelValue', icon.value)"
        class="opacity-0 absolute"
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
    currentId: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
[type="radio"]:checked + svg {
  @apply bg-main fill-current text-white rounded-full;
}
</style>
