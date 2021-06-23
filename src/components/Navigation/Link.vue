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
import { onMounted, ref } from "vue";
export default {
  emits: ["getoffsetposition"],
  props: {
    to: { type: String, required: true },
    name: { type: String, required: true },
    setup() {
      const link = ref(null);
      console.log(link);
      onMounted(() => {
        console.log(link.value.offSetWidth);
      });
      return { link };
    },
  },
};
</script>

<style></style>
