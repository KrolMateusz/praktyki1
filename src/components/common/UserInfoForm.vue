<template>
  <form
    @submit.prevent="checkForm(setUser)"
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
      <text-input classes="w-full mb-4" label="Imię" v-model:value="name">
        <Error :message="v$.name.$errors[0].$message" v-if="v$.name.$error" />
      </text-input>
      <text-input
        classes="w-full mb-4"
        label="Nazwisko"
        v-model:value="lastname"
      >
        <Error
          :message="v$.lastname.$errors[0].$message"
          v-if="v$.lastname.$error"
        />
      </text-input>
    </div>
    <div class="flex justify-center mb-11 text-base">
      <text-input
        classes="relative w-24"
        type="number"
        label="Wzrost"
        min="0"
        step="0.01"
        v-model:value.number="height"
      >
        <Error
          :message="v$.height.$errors[0].$message"
          classes="absolute w-max -bottom-10"
          v-if="v$.height.$error"
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
          :message="v$.weight.$errors[0].$message"
          classes="absolute w-max -bottom-10"
          v-if="v$.weight.$error"
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
import useValidate from "@/composable/useValidate";
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
    const {
      name,
      lastname,
      height,
      weight,
      heightUnit,
      weightUnit,
      v$,
      checkForm,
    } = useValidate();
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

    const setUser = () => {
      emit("closeModal");
      store.commit("SET_USER", {
        name: name.value.charAt(0).toUpperCase() + name.value.slice(1),
        lastname: lastname.value.charAt(0).toUpperCase() + name.value.slice(1),
        height: height.value,
        heightUnit: heightUnit.value,
        weight: weight.value,
        weightUnit: weightUnit.value,
        image: image.value,
        BMI: calculateBMI(),
      });
    };
    const uploadImage = (e) => {
      const reader = new FileReader();
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
      v$,
      checkForm,
      setUser,
      uploadImage,
      clearAvatar,
    };
  },
};
</script>
