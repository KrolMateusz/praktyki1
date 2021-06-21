<template>
  <label>{{ label }}</label>
  <input
    type="text"
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "FormText",
  props: {
    id: String,
    label: String,
    placeholder: String,
    modelValue: String,
  },
};
</script>
