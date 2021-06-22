<template>
  <div class="flex flex-col items-start" :class="classes">
    <label class="max-w-full font-medium">{{ label }}</label>
    <input
      @input="updateValue"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      class="border border-solid border-black rounded-sm max-w-full"
      type="text"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    id: String,
    label: String,
    placeholder: String,
    modelValue: String,
    classes: String,
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
