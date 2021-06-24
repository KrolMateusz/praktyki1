<template>
  <li ref="link">
    <router-link
      ref="link"
      class="text-white text-3xl relative mr-20"
      :to="to"
      >{{ name }}</router-link
    >
  </li>
</template>

<script>
import { computed, watchEffect, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  emits: ["getLinkPosition"],
  props: {
    to: { type: String, required: true },
    name: { type: String, required: true },
  },
  setup(props, { emit }) {
    const store = useStore();
    const activeLinkName = computed(() => store.getters.getActiveRouteName);
    const link = ref(null);

    watchEffect(() => {
      const isActiveLink = activeLinkName.value === props.name;
      if (isActiveLink) {
        emit("getLinkPosition", link.value.offsetLeft);
      }
    });

    return { activeLinkName, link };
  },
};
</script>

<style></style>
