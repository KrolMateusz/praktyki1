<template>
  <form
    @submit.prevent="checkForm"
    class="flex flex-col justify-between px-14 py-14 w-160"
  >
    <div class="flex justify-between items-center mb-5">
      <Avatar :first-name="name" :img-path="image" />
      <div class="flex flex-col justify-between h-24 text-base">
        <label
          class="
            flex
            justify-center
            items-center
            bg-main
            rounded-sm
            text-white
            font-normal
            py-1
            px-10
            h-11
            ml-12
            cursor-pointer
          "
        >
          Wrzuć awatar
          <input @change="uploadImage" ref="file" type="file" hidden />
        </label>
        <Button
          @click.prevent="clearAvatar"
          label="Usuń awatar"
          class="h-11 ml-12"
          is-warning
        />
      </div>
    </div>
    <div class="flex flex-col items-center text-base">
      <text-input
        classes="relative w-full mb-24"
        label="Imię"
        v-model:value="name"
      >
        <Error
          :message="errors.name"
          classes="absolute -bottom-22"
          v-if="errors.name"
        />
      </text-input>
      <text-input
        classes="relative w-full mb-24"
        label="Nazwisko"
        v-model:value="lastname"
      >
        <Error
          :message="errors.lastname"
          classes="absolute -bottom-22"
          v-if="errors.lastname"
        />
      </text-input>
    </div>
    <div class="flex justify-center mb-11 text-base">
      <text-input
        classes="relative w-24"
        type="number"
        label="Wzrost"
        min="0"
        step="0.1"
        v-model:value.number="height"
      >
        <Error
          :message="errors.height"
          classes="absolute w-max -bottom-10"
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
    <div class="flex justify-center items-end mb-11 text-base">
      <text-input
        classes="relative w-24"
        type="number"
        label="Waga"
        min="0"
        step="0.1"
        v-model:value.number="weight"
      >
        <Error
          :message="errors.weight"
          classes="absolute w-max -bottom-10"
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
    <Button class="border border-black mt-6" label="Zapisz" />
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import Error from "@/components/common/Error";
import RadioGroup from "@/components/common/RadioGroup";
import TextInput from "@/components/common/TextInput";

export default {
  name: "Modal",
  components: {
    Avatar,
    Button,
    Error,
    RadioGroup,
    TextInput,
  },
  setup(props, { emit }) {
    const store = useStore();
    const name = ref(store.getters.getName);
    const lastname = ref(store.getters.getLastname);
    const height = ref(store.getters.getHeight);
    const weight = ref(store.getters.getWeight);
    const heightUnit = ref(store.getters.getHeightUnit);
    const weightUnit = ref(store.getters.getWeightUnit);
    const image = ref(store.getters.getImage);
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
    const calculateBMI = () => {
      let actualHeight = height.value;
      let actualWeight = weight.value;
      if (heightUnit.value === "cm") {
        actualHeight = height.value / 100;
      }
      if (weightUnit.value === "lbs") {
        actualWeight = weight.value * 0.454;
      }
      const actualBMI = actualWeight / actualHeight ** 2;
      return actualBMI.toFixed(1);
    };

    const checkForm = () => {
      errors.value = {};
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
      if (Object.keys(errors.value).length === 0) {
        setUser();
        emit("closeModal");
      }
    };
    const setUser = () =>
      store.commit("SET_USER", {
        name: name.value,
        lastname: lastname.value,
        height: height.value,
        heightUnit: heightUnit.value,
        weight: weight.value,
        weightUnit: weightUnit.value,
        image: image.value,
        BMI: calculateBMI(),
      });
    const uploadImage = (e) => {
      const reader = new FileReader();
      if (!e.target.files[0]) return;
      reader.onload = () => {
        image.value = reader.result;
        e.target.value = "";
      };
      reader.readAsDataURL(e.target.files[0]);
    };
    const clearAvatar = () => (image.value = "");

    return {
      image,
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
      setUser,
      uploadImage,
      clearAvatar,
    };
  },
};
</script>
