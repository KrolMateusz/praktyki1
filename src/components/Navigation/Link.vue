<template>
  <li ref="link">
    <router-link ref="link" class="text-white text-3xl relative mx-10" :to="to">
      {{ name }}
    </router-link>
  </li>
</template>

<script>
import { computed, watchEffect, ref } from "vue";
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
      if (isActiveLink && link.value) {
        emit("getLinkPosition", link.value);
      }
    });

    return { activeLinkName, link };
  },
};
</script>

<style></style>
