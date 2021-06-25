<template>
  <div class="max-w-sm">
    <div class="flex w-full p-2">
      <div class="group relative">
        <p
          class="
            w-24
            text-center
            opacity-0
            absolute
            top-1/2
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            group-hover:opacity-100
          "
        >
          Edit profile
        </p>
        <Avatar
          :firstName="name"
          @click="$emit('openModal')"
          class="group-hover:opacity-50"
        />
      </div>
      <div class="flex flex-col justify-center ml-3">
        <p class="font-medium text-5xl break-all">
          {{ name }}
        </p>
        <p class="text-2xl break-all">{{ lastname }}</p>
      </div>
    </div>
    <UserStats
      :weight="weight"
      :height="height"
      :BMI="BMI"
      :FFMI="FFMI"
      :lowTempo="lowTempo"
      :fastTempo="fastTempo"
    />
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
    BMI: {
      Number,
      required: true,
    },
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
    const height = computed(() => store.getters.getHeight);
    const weight = computed(() => store.getters.getWeight);
    const actualName = computed({
      get() {
        return this.actualName;
      },
      set(value) {
        this.actualName = value;
      },
    });

    return { name, lastname, height, weight, actualName };
  },
};
</script>
