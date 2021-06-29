<template>
  <div
    class="
      space-x-5
      justify-items-center
      mx-20
      my-10
      grid grid grid-cols-12
      items-center
    "
  >
    <div class="col-start-1 col-span-2">Profile goes here</div>
    <GoogleMaps class="col-start-3 col-span-6" />
    <Form class="col-end-13 col-span-4"></Form>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from "../googleMaps/GoogleMaps.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Form,
  },
};
</script>
