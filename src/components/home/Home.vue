<template>
  <div class="container">
    <div class="grid grid-cols-12 items-center">
      <Profile
        class="col-span-3"
        :name="name"
        :lastname="lastname"
        :weight="weight"
        :height="height"
        :BMI="BMI"
        :FFMI="FFMI"
        :lowTempo="lowTempo"
        :fastTempo="fastTempo"
      />
      <div>Trip setting goes here</div>
    </div>
    <GoogleMaps />
  </div>
</template>

<script>
import GoogleMaps from "@/components/googleMaps/GoogleMaps.vue";
import Profile from "@/components/common/Profile.vue";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Profile,
  },
  setup() {
    const name = ref("Jan");
    const lastname = ref("Kowalski");
    const weight = ref(86);
    const height = ref(180);
    const BMI = ref(23.42);
    const FFMI = ref();
    const lowTempo = ref(0.3);
    const fastTempo = ref(0.9);

    return { name, lastname, weight, height, BMI, FFMI, lowTempo, fastTempo };
  },
};
</script>
