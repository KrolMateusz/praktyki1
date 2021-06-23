<template>
  <span>{{ groupLabel }}</span>
  <div class="flex justify-between items-center">
    <div v-for="option in options" :key="option.key">
      <label>
        <input
          :name="option.name"
          :id="index"
          :value="option.value"
          v-model="selected"
          class="mr-1"
          type="radio"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

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
            typeof option.value === "string" &&
            typeof option.name === "string" &&
            typeof option.label === "string"
        );
      },
    },
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props, { emit }) {
    const selected = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    return {
      selected,
    };
  },
};
</script>
