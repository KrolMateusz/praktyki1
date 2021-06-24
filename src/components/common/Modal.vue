<template>
  <div class="fixed z-50 top-0 left-0 bg-black bg-opacity-60 h-screen w-screen">
    <div class="flex justify-center items-center w-full h-full">
      <form
        @submit="checkForm"
        class="flex flex-col justify-around items-stretch w-1/3 h-2/5 bg-white"
      >
        <div class="flex justify-between m-4">
          <span>Edytuj profil</span>
          <button @click="hideModal">x</button>
        </div>
        <div class="flex justify-between items-center mx-12 my-5">
          <Avatar :first-name="name" />
          <div class="flex flex-col">
            <button>Wrzuć awatar</button>
            <button>Usuń awatar</button>
          </div>
        </div>
        <div class="flex flex-col items-center mx-12 my-5">
          <text-input label="Imię" classes="w-full" v-model:value="name" />
          <Error :message="errors.name" v-if="errors.name" />
          <text-input
            label="Nazwisko"
            classes="w-full"
            v-model:value="surname"
          />
          <Error :message="errors.surname" v-if="errors.surname" />
        </div>
        <div class="relative flex justify-center mx-12 my-2">
          <text-input
            type="number"
            label="Wzrost"
            classes="w-24"
            min="0"
            v-model:value.number="height"
          />
          <radio-group
            classes="ml-4 w-36"
            :options="heightRadioOptions"
            group-label="Jednostka"
            v-model:selected="heightUnit"
          />
          <Error
            classes="absolute bottom-0"
            :message="errors.height"
            v-if="errors.height"
          />
        </div>
        <div class="flex justify-center mx-12 my-2">
          <text-input
            type="number"
            label="Waga"
            classes="w-24"
            min="0"
            v-model:value.number="weight"
          />
          <radio-group
            classes="ml-4 w-36"
            :options="weightRadioOptions"
            group-label="Jednostka"
            v-model:selected="weightUnit"
          />
          <Error classes="" :message="errors.weight" v-if="errors.weight" />
        </div>
        <button class="border border-black mx-12 my-5">Zapisz</button>
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
