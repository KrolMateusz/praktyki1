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
        <p class="text-2xl break-all">{{ surname }}</p>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <p class="">Podstawowe informacje:</p>
      <p>
        Waga: <span class="font-semibold">{{ weight }} kg</span>
      </p>
      <p>
        Wzrost: <span class="font-semibold">{{ height }} cm</span>
      </p>
      <p>
        BMI: <span class="font-semibold">{{ getBMI }}</span>
      </p>
      <p>
        FFMI:
        <span class="font-semibold">{{ getFFMI }} kg/m<sup>2</sup></span>
      </p>
    </div>
    <div class="infoContainer p-2">
      <p class="">Spalasz:</p>
      <p>
        Wolno: <span class="font-semibold">{{ getLowTemp }} kg/h</span>
      </p>
      <p>
        Szybko: <span class="font-semibold">{{ getFastTemp }} kg/h</span>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import Avatar from "./Avatar.vue";

export default {
  components: { Avatar },
  props: {
    name: {
      String,
      required: true,
    },
    surname: {
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
    lowtemp: {
      Number,
      required: true,
    },
    fasttemp: {
      Number,
      required: true,
    },
  },
  extend: {
    wordBreak: ["hover", "focus"],
  },
  setup(props) {
    const getName = computed(() => props.name.capitalize);
    const getBMI = computed(() =>
      (props.weight / Math.pow(props.height, 2)).toFixed(2)
    );
    const getFFMI = computed(() => (props.weight * 0.83).toFixed(2));
    const getLowTemp = computed(() => (props.weight * 0.005).toFixed(2));
    const getFastTemp = computed(() => (props.weight * 0.005 + 0.5).toFixed(2));

    function buttonFunction() {
      console.log("Add modal here...");
    }

    return {
      getName,
      getBMI,
      getFFMI,
      getLowTemp,
      getFastTemp,
      buttonFunction,
    };
  },
};
</script>
