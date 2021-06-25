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
          @click="buttonFunction"
          :firstName="name"
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
import Avatar from "@/components/common/Avatar.vue";
import UserStats from "@/components/common/UserStats.vue";

export default {
  components: { Avatar, UserStats },
  props: {
    name: {
      String,
      required: true,
    },
    lastname: {
      String,
      required: true,
    },
    weight: {
      Number,
      required: true,
    },
    height: {
      Number,
      required: true,
    },
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
    function buttonFunction() {
      console.log("Add modal here...");
    }

    return {
      buttonFunction,
    };
  },
};
</script>
