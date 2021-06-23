<template>
  <li ref="link">
    <router-link
      @click="$emit('getoffsetposition', $event)"
      class="text-white text-3xl relative mr-20"
      :to="to"
      >{{ name }}</router-link
    >
  </li>
</template>

<script>
export default {
  emits: ["getoffsetposition"],
  props: {
    to: { type: String, required: true },
    name: { type: String, required: true },
  },
};
</script>

<style></style>
