<template>
  <span>{{ groupLabel }}</span>
  <div class="flex justify-between items-center">
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
</template>
<script>
export default {
  props: {
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
      required: false,
      default: "",
    },
  },
};
</script>
