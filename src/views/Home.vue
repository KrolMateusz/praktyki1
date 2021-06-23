<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Profile />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Profile from "@/components/common/Profile.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Profile,
  },
};
</script>
