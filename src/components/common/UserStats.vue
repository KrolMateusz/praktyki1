<template>
  <div class="flex flex-col p-2">
    <p class="pt-3">Podstawowe informacje:</p>
    <div class="pl-7 pt-1">
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
  </div>
  <div class="infoContainer p-2">
    <p>Spalasz:</p>
    <div class="pl-7 pt-1">
      <p>
        Wolno:
        <span class="font-semibold">{{ lowTempo }} {{ weightUnit }}/h</span>
      </p>
      <p>
        Szybko:
        <span class="font-semibold">{{ fastTempo }} {{ weightUnit }}/h</span>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
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
    const weight = computed(() => store.getters.getWeight);
    const height = computed(() => store.getters.getHeight);
    const weightUnit = computed(() => store.getters.getWeightUnit);
    const heightUnit = computed(() => store.getters.getHeightUnit);
    const BMI = computed(() => store.getters.getBMI);

    return { weightUnit, heightUnit, weight, height, BMI };
  },
};
</script>
