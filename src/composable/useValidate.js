import { computed, ref } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  alpha,
  decimal,
  minValue,
  helpers,
} from "@vuelidate/validators";

export default function () {
  const store = useStore();
  const name = ref(store.getters.getName);
  const lastname = ref(store.getters.getLastname);
  const height = ref(store.getters.getHeight);
  const weight = ref(store.getters.getWeight);
  const heightUnit = ref(store.getters.getHeightUnit);
  const weightUnit = ref(store.getters.getWeightUnit);
  const rules = computed(() => ({
    name: {
      alpha: helpers.withMessage("MOJA ALPHA", alpha),
      minLength: minLength(2),
      required,
    },
    lastname: {
      alpha,
      minLength: minLength(2),
      required,
    },
    height: {
      decimal,
      minValue: minValue(0),
      required,
    },
    weight: {
      decimal,
      minValue: minValue(0),
      required,
    },
    heightUnit: { required },
    weightUnit: { required },
  }));

  const v$ = useVuelidate(rules, {
    name,
    lastname,
    height,
    weight,
    heightUnit,
    weightUnit,
  });

  const checkForm = (onSuccess) => {
    v$.value.$touch();
    if (v$.value.$error) return;
    onSuccess();
  };

  return {
    name,
    lastname,
    height,
    weight,
    heightUnit,
    weightUnit,
    v$,
    checkForm,
  };
}
