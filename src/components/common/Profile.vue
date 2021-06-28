<template>
  <div class="max-w-sm">
    <div class="flex w-full p-2">
      <div @click="$emit('openModal')" class="group relative cursor-pointer">
        <div class="relative bg-black rounded-full hover:opacity-100">
          <Avatar
            :firstName="name"
            :img-path="image"
            class="group-hover:opacity-30"
          />
        </div>
        <p
          class="
            cursor-pointer
            opacity-0
            w-24
            text-center text-white
            absolute
            top-1/2
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            group-hover:opacity-100
          "
        >
          Edytuj profil
        </p>
      </div>
      <div class="flex flex-col justify-center ml-3">
        <p class="font-medium text-5xl break-all">
          {{ name }}
        </p>
        <p class="text-2xl break-all">{{ lastname }}</p>
      </div>
    </div>
    <UserStats :FFMI="FFMI" :lowTempo="lowTempo" :fastTempo="fastTempo" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Avatar from "@/components/common/Avatar.vue";
import UserStats from "@/components/common/UserStats.vue";

export default {
  components: { Avatar, UserStats },
  props: {
    FFMI: {
      Number,
      default: "",
    },
    lowTempo: {
      Number,
      required: true,
    },
    fastTempo: {
      Number,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const name = computed(() => store.getters.getName);
    const lastname = computed(() => store.getters.getLastname);
    const image = computed(() => store.getters.getImage);

    return { name, lastname, image };
  },
};
</script>
