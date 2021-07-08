<template>
  <Navigation class="bottom-0 fixed z-50" />
  <router-view />
</template>

<script>
import Navigation from "@/components/Navigation/Navigation";
export default {
  components: { Navigation },
};
</script>

<style></style>
