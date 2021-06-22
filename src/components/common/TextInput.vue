<template>
  <div class="flex flex-col items-start" :class="classes">
    <label class="max-w-full font-medium">{{ label }}</label>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      class="border border-solid border-black rounded-sm max-w-full"
      type="text"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
    classes: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const updateValue = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return { updateValue };
  },
};
</script>
