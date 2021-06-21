<template>
  <div class="w-full flex flex-col items-start">
    <label class="max-w-full">{{ label }}</label>
    <input
      class="max-w-full"
      type="text"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
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
