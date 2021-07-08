<template>
  <Navigation v-if="isAuth" class="bottom-0 fixed z-50" />
  <router-view />
</template>

<script>
import { ref } from "vue";
import Navigation from "@/components/Navigation/Navigation";
import { auth } from "@/firebase";
export default {
  components: { Navigation },
  setup() {
    const isAuth = ref(false);

    auth.onAuthStateChanged((user) => {
      user ? (isAuth.value = true) : (isAuth.value = false);
    });

    return {
      isAuth,
    };
  },
};
</script>

<style></style>
