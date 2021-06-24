<template>
  <div class="container">
    <div class="grid grid-cols-12 items-center">
      <Profile
        class="col-span-3"
        :name="name"
        :surname="surname"
        :weight="weight"
        :height="height"
      />
      <div>Trip setting goes here</div>
    </div>
    <GoogleMaps />
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from "../googleMaps/GoogleMaps.vue";
import Profile from "../common/Profile.vue";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Profile,
  },
  setup() {
    const name = ref("Jan");
    const surname = ref("Kowalski");
    const weight = ref(86);
    const height = ref(180);

    return { name, surname, weight, height };
  },
};
</script>
