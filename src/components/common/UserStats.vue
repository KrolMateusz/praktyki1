<template>
  <div class="flex flex-col p-2">
    <p class="">Podstawowe informacje:</p>
    <p>
      Waga: <span class="font-semibold">{{ weight }} {{ weightUnit }}</span>
    </p>
    <p>
      Wzrost: <span class="font-semibold">{{ height }} {{ heightUnit }}</span>
    </p>
    <p>
      BMI: <span class="font-semibold">{{ BMI }}</span>
    </p>
    <p v-if="FFMI">
      FFMI:
      <span class="font-semibold" v-if="FFMI"
        >{{ FFMI }} {{ weightUnit }}<sup>2</sup></span
      >
    </p>
  </div>
  <div class="infoContainer p-2">
    <p>Spalasz:</p>
    <p>
      Wolno:
      <span class="font-semibold">{{ lowTempo }} {{ weightUnit }}/h</span>
    </p>
    <p>
      Szybko:
      <span class="font-semibold">{{ fastTempo }} {{ weightUnit }}/h</span>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
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
    //Jednostki będą zaciągane z modala, czekam na merge do deva, zebym mogł zaciagnac
    const weightUnit = ref("kg");
    const heightUnit = ref("cm");

    return { weightUnit, heightUnit };
  },
};
</script>
