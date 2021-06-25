<template>
  <div class="fixed z-50 top-0 left-0 bg-black bg-opacity-60 h-screen w-screen">
    <div class="flex justify-center items-center w-full h-full">
      <form @submit="checkForm" class="flex flex-col justify-between bg-white">
        <div class="flex justify-between m-5">
          <span>Edytuj profil</span>
          <button @click="hideModal">x</button>
        </div>
        <div class="flex justify-between items-center mx-12 mb-5">
          <Avatar :first-name="name" />
          <div class="flex flex-col justify-between h-24">
            <Button label="Wrzuć awatar" class="h-10 ml-8" />
            <Button label="Wrzuć awatar" class="h-10 ml-8" is-warning />
          </div>
        </div>
        <div class="flex flex-col items-center mx-12">
          <text-input
            classes="relative w-full mb-10"
            label="Imię"
            v-model:value="name"
          >
            <Error
              :message="errors.name"
              classes="absolute -bottom-7"
              v-if="errors.name"
            />
          </text-input>
          <text-input
            classes="relative w-full mb-12"
            label="Nazwisko"
            v-model:value="lastname"
          >
            <Error
              :message="errors.lastname"
              classes="absolute -bottom-12"
              v-if="errors.lastname"
            />
          </text-input>
        </div>
        <div class="flex justify-center mx-12 mb-8">
          <text-input
            classes="relative w-24"
            type="number"
            label="Wzrost"
            min="0"
            v-model:value.number="height"
          >
            <Error
              :message="errors.height"
              classes="absolute w-max -bottom-6"
              v-if="errors.height"
            />
          </text-input>
          <radio-group
            :options="heightRadioOptions"
            classes="ml-8 w-36"
            group-label="Jednostka"
            v-model:selected="heightUnit"
          />
        </div>
        <div class="flex justify-center items-end mx-12 mb-8">
          <text-input
            classes="relative w-24"
            type="number"
            label="Waga"
            min="0"
            v-model:value.number="weight"
          >
            <Error
              :message="errors.weight"
              classes="absolute w-max -bottom-6"
              v-if="errors.weight"
            />
          </text-input>
          <radio-group
            :options="weightRadioOptions"
            classes="relative ml-8 w-36"
            group-label="Jednostka"
            v-model:selected="weightUnit"
          />
        </div>
        <Button class="border border-black mx-12 my-6" label="Zapisz" />
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Button from "@/components/common/Button";
import Error from "@/components/common/Error";
import RadioGroup from "@/components/common/RadioGroup";
import TextInput from "@/components/common/TextInput";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Modal",
  components: {
    Avatar,
    Button,
    Error,
    RadioGroup,
    TextInput,
  },
  setup() {
    const store = useStore();
    const name = ref(store.getters.getName);
    const lastname = ref(store.getters.getLastname);
    const height = ref(store.getters.getHeight);
    const weight = ref(store.getters.getWeight);
    const heightUnit = ref(store.getters.getHeightUnit);
    const weightUnit = ref(store.getters.getWeightUnit);
    const heightRadioOptions = [
      {
        value: "m",
        label: "m",
      },
      {
        value: "cm",
        label: "cm",
      },
    ];
    const weightRadioOptions = [
      {
        value: "kg",
        label: "kg",
      },
      {
        value: "lbs",
        label: "lbs",
      },
    ];
    const errors = ref({});

    const checkForm = (e) => {
      errors.value = {};
      e.preventDefault();
      if (!/^\D{2,}$/.test(name.value) || !name.value) {
        errors.value.name =
          "Imię musi posiadać co najmniej 2 litery i żadnych cyfr";
      }
      if (!/^\D{2,}$/.test(lastname.value) || !lastname.value) {
        errors.value.lastname =
          "Nazwisko musi posiadać co najmniej 2 litery i żadnych cyfr";
      }
      if (!height.value) {
        errors.value.height = "Wzrost jest wymagany";
      }
      if (!weight.value) {
        errors.value.weight = "Waga jest wymagana";
      }
      if (Object.keys(errors.value).length === 0) setUser();
    };
    const hideModal = () => store.commit("HIDE_MODAL");
    const setUser = () =>
      store.commit("SET_USER", {
        name: name.value,
        lastname: lastname.value,
        height: height.value,
        heightUnit: heightUnit.value,
        weight: weight.value,
        weightUnit: weightUnit.value,
      });

    return {
      name,
      lastname,
      height,
      weight,
      heightUnit,
      weightUnit,
      heightRadioOptions,
      weightRadioOptions,
      errors,
      checkForm,
      hideModal,
      setUser,
    };
  },
};
</script>
