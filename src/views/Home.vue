<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <RadioButtons />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import RadioButtons from "@/common/RadioButtons";

export default {
  name: "Home",
  components: {
    HelloWorld,
    RadioButtons,
  },
};
</script>
