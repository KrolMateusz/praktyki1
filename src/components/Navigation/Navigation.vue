<template>
  <nav class="flex px-40 h-24 text-base relative bg-main">
    <ul class="flex items-center">
      <Link
        :key="route.name"
        :to="route.path"
        :name="route.name"
        @getLinkPosition="setDotPosition"
        v-for="route in filterRoutes"
      />
    </ul>
    <div
      :style="{ transform: `translate(${linkPosition}px, 1.5rem)  ` }"
      ref="dot"
      class="
        absolute
        w-10
        h-10
        bg-main
        rounded-full
        bottom-0
        left-0
        border-4 border-white
        transform
        transition-transform
      "
    ></div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { routes } from "@/router/index";
import Link from "@/components/Navigation/Link.vue";

export default {
  components: {
    Link,
  },
  setup() {
    const linkPosition = ref(0);
    const dot = ref(null);

    const filterRoutes = routes.filter((r) => r.meta);

    const setDotPosition = (link) => {
      linkPosition.value =
        link.offsetLeft + link.offsetWidth / 2 - dot.value.offsetWidth / 2;
    };

    return {
      linkPosition,
      dot,
      filterRoutes,
      setDotPosition,
    };
  },
};
</script>

<style></style>
