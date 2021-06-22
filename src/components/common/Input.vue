<template>
  <div class="flex flex-col items-start" :class="classes">
    <label class="max-w-full font-medium">{{ label }}</label>
    <input
      class="border border-solid border-black rounded-sm max-w-full"
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
    classes: String,
  },
};
</script>
