<template>
  <span>{{ groupLabel }}</span>
  <div class="flex justify-between items-center">
    <div v-for="(option, index) in options" :key="option.key">
      <input
        :name="option.name"
        :id="index"
        :value="option.value"
        class="mr-1"
        type="radio"
        v-model="selected"
      />
      <label :for="index">{{ option.label }}</label>
    </div>
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
            typeof option.value === "string" &&
            typeof option.name === "string" &&
            typeof option.label === "string"
        );
      },
    },
    modelValue: {
      type: String,
      required: false,
    },
  },
  computed: {
    selected: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
