<template>
  <li>
    <router-link
      :active="activeRoute"
      ref="link"
      @click="$emit('getoffsetposition', $event)"
      class="text-white text-3xl relative mr-20"
      :to="to"
      >{{ name }}</router-link
    >
  </li>
</template>

<script>
import { RouterLink, useLink } from "vue-router";

export default {
  emits: ["getoffsetposition", "setdefaultvalue"],
  props: {
    to: { type: String, required: true },
    name: { type: String, required: true },
    ...RouterLink.props,
  },
  setup(props) {
    const { isActive } = useLink(props);
    const activeRoute = isActive;

    return { activeRoute };
  },
};
</script>

<style></style>
