<template>
  <p>{{ groupLabel }}</p>
  <div class="flex justify-between items-center">
    <div v-for="option in options" :key="option.key">
      <input
        class="mr-1"
        type="radio"
        :id="option.key"
        :value="option.value"
        v-model="selected"
      />
      <label :for="option.key">{{ option.label }}</label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    groupLabel: String,
    options: Array,
  },
  data() {
    return {
      selected: "",
    };
  },
};
</script>
