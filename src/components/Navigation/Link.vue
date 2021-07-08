<template>
  <li ref="link">
    <router-link
      ref="link"
      class="text-white text-3xl relative mx-10"
      :to="to"
      @click="logout"
    >
      {{ name }}
    </router-link>
  </li>
</template>

<script>
import { computed, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import { auth } from "../../firebase";
import router from "../../router";

export default {
  emits: ["getLinkPosition"],
  props: {
    to: { type: String, required: true },
    name: { type: String, required: true },
  },

  setup(props, { emit }) {
    const store = useStore();
    const activeLinkName = computed(() => store.getters.getActiveRouteName);
    const link = ref(null);

    watchEffect(() => {
      const setDot = () => {
        const isActiveLink = activeLinkName.value === props.name;
        if (isActiveLink && link.value) {
          emit("getLinkPosition", link.value);
        }
      };
      window.addEventListener("resize", setDot);
      setDot();
    });

    const logout = async () => {
      if (props.name === "Logout") {
        store.commit("setUserAuth", null);
        await auth.signOut();
        router.push("/login");
      }
    };

    return { activeLinkName, link, logout };
  },
};
</script>

<style></style>
