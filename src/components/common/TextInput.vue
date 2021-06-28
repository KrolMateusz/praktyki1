<template>
  <div :class="classes" class="flex flex-col items-start">
    <label class="w-full font-medium">{{ label }}</label>
    <input
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :min="min"
      :step="step"
      @input="updateValue"
      class="border border-solid border-black rounded-sm w-full px-2"
    />
    <slot />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    type: {
      type: String,
      default: "text",
      validator(type) {
        return ["text", "number"].includes(type);
      },
    },
    min: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    classes: {
      type: String,
      default: "",
    },
    step: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const updateValue = (event) => {
      emit("update:value", event.target.value);
    };

    return {
      updateValue,
    };
  },
};
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
