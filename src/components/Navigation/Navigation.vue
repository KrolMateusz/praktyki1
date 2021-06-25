<template>
  <nav class="px-40 py-8 relative bg-main">
    <ul class="flex">
      <Link
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
        :name="route.name"
        @getLinkPosition="setDotPosition"
      />
    </ul>
    <div
      ref="dot"
      :style="{ transform: `translate(${linkPosition}px, 1.5rem)  ` }"
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
import Link from "./Link.vue";

export default {
  components: {
    Link,
  },
  setup() {
    const linkPosition = ref(0);
    const dot = ref(null);

    const setDotPosition = (value) => {
      linkPosition.value = value + dot.value.offsetWidth / 2;
    };

    return {
      linkPosition,
      dot,
      routes,
      setDotPosition,
    };
  },
};
</script>

<style></style>
