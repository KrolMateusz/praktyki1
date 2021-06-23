<template>
  <nav class="px-40 py-8 relative bg-main">
    <ul class="flex">
      <Link
        v-for="(route, index) in routeValues"
        :ref="el => {links[index] = el}"
        :key="route.name"
        :to="route.path"
        :name="route.name"
        @getoffsetposition="handleDotAnimation"
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
          transition-transform
        "
      ></div>
    </ul>
  </nav>
</template>

<script>
import {  onMounted, ref } from "vue";
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
    const links = ref([])
    function handleDotAnimation(e) {
      position.value = e.target.offsetLeft + dot.value.offsetWidth / 2;
      
    }

    onMounted(() => {
    position.value =links.value[0].$el.offsetWidth + dot.value.offsetWidth / 2
    }
    )

    return {
      handleDotAnimation,
      position,
      dot,
      routeValues,
      links
    };
  },
};
</script>

<style></style>
