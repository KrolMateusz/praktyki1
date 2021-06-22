<template>
  <li>
    <router-link
      @click="$emit(getOffSetLeft)"
      class="text-white text-3xl relative mr-10"
      :to="to"
      >{{ name }}</router-link
    >
  </li>
</template>

<script>
export default {
  emits: {
    getOffSetLeft: null,
  },
  props: {
    to: { type: String, required: true },
    name: { type: String, required: true },
  },
};
</script>

<style></style>
