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
          <div class="flex flex-col">
            <button>Wrzuć awatar</button>
            <button>Usuń awatar</button>
          </div>
        </div>
        <div class="flex flex-col items-center mx-12">
          <text-input
            classes="relative w-full mb-14"
            label="Imię"
            v-model:value="name"
          >
            <Error
              :message="errors.name"
              classes="absolute -bottom-12"
              v-if="errors.name"
            />
          </text-input>
          <text-input
            classes="relative w-full mb-14"
            label="Nazwisko"
            v-model:value="surname"
          >
            <Error
              :message="errors.surname"
              classes="absolute -bottom-12"
              v-if="errors.surname"
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
              classes="absolute w-max -bottom-6"
              :message="errors.height"
              v-if="errors.height"
            />
          </text-input>
          <radio-group
            classes="ml-8 w-36"
            :options="heightRadioOptions"
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
              classes="absolute w-max -bottom-6"
              :message="errors.weight"
              v-if="errors.weight"
            />
          </text-input>
          <radio-group
            classes="relative ml-8 w-36"
            :options="weightRadioOptions"
            group-label="Jednostka"
            v-model:selected="weightUnit"
          />
        </div>
        <button class="border border-black mx-12 my-6">Zapisz</button>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Error from "@/components/common/Error";
import RadioGroup from "@/components/common/RadioGroup";
import TextInput from "@/components/common/TextInput";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Modal",
  components: {
    Avatar,
    Error,
    RadioGroup,
    TextInput,
  },
  setup() {
    const store = useStore();
    const name = ref(store.getters.getName);
    const surname = ref(store.getters.getSurname);
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
      if (!/^\D{2,}$/.test(surname.value) || !surname.value) {
        errors.value.surname =
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
        surname: surname.value,
        height: height.value,
        heightUnit: heightUnit.value,
        weight: weight.value,
        weightUnit: weightUnit.value,
      });

    return {
      name,
      surname,
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
