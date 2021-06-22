<template>
  <nav class="px-40 py-8 relative bg-main">
    <ul class="flex">
      <Link
        v-for="route in routeValues"
        :key="route.name"
        :to="route.path"
        :name="route.name"
        @getOffSetLeft="handleDotAnimation"
      />
      <div
        ref="dot"
        :style="{ transform: `translate(${position}px, 15px)` }"
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
          translate-y-5
          transition-transform
        "
      ></div>
    </ul>
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
    const position = ref(0);
    const dot = ref(null);
    const routeValues = ref(routes);

    function handleDotAnimation(e) {
      position.value = e.target.offsetLeft + dot.value.offsetWidth / 2;
    }

    return {
      handleDotAnimation,
      position,
      dot,
      routeValues,
    };
  },
};
</script>

<style></style>
