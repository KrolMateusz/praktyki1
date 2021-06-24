<template>
  <div :class="classes" class="flex flex-col items-center">
    <span>{{ groupLabel }}</span>
    <div class="w-full flex justify-between">
      <label :key="option.key" v-for="option in options">
        <input
          :name="option.name"
          :value="selected"
          :checked="selected === option.value"
          @change="$emit('update:selected', option.value)"
          class="mr-1"
          type="radio"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    classes: {
      type: String,
      default: "",
    },
    groupLabel: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator(options) {
        return options.every(
          (option) =>
            typeof option.value === "string" && typeof option.label === "string"
        );
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
};
</script>
