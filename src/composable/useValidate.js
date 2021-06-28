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
  const messages = {
    alpha: "Pole powinno zawierać tylko litery",
    decimal: "Pole powinno zawierać liczby",
    minLength: "Pole powinno zawierać przynajmniej 2 litery",
    minValue: "Pole powinno zawierać dodatnie wartości",
    required: "Pole jest wymagane",
  };
  const store = useStore();
  const name = ref(store.getters.getName);
  const lastname = ref(store.getters.getLastname);
  const height = ref(store.getters.getHeight);
  const weight = ref(store.getters.getWeight);
  const heightUnit = ref(store.getters.getHeightUnit);
  const weightUnit = ref(store.getters.getWeightUnit);
  const rules = computed(() => ({
    name: {
      alpha: helpers.withMessage(messages.alpha, alpha),
      minLength: helpers.withMessage(messages.minLength, minLength(2)),
      required: helpers.withMessage(messages.required, required),
    },
    lastname: {
      alpha: helpers.withMessage(messages.alpha, alpha),
      minLength: helpers.withMessage(messages.minLength, minLength(2)),
      required: helpers.withMessage(messages.required, required),
    },
    height: {
      decimal: helpers.withMessage(messages.decimal, decimal),
      minValue: helpers.withMessage(messages.minValue, minValue(0)),
      required: helpers.withMessage(messages.required, required),
    },
    weight: {
      decimal: helpers.withMessage(messages.decimal, decimal),
      minValue: helpers.withMessage(messages.minValue, minValue(0)),
      required: helpers.withMessage(messages.required, required),
    },
    heightUnit: { required: helpers.withMessage(messages.required, required) },
    weightUnit: { required: helpers.withMessage(messages.required, required) },
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
