<template>
  <Navigation v-if="isAuth" />
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
      if (user) {
        isAuth.value = true;
      } else {
        isAuth.value = false;
      }
    });

    return {
      isAuth,
    };
  },
};
</script>

<style></style>
