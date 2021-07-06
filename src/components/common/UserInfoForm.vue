<template>
  <form
    @submit.prevent="checkForm(setUser)"
    class="flex flex-col justify-between px-14 py-14 w-160"
    novalidate
  >
    <div class="flex justify-between items-center mb-5">
      <Avatar :first-name="avatarFirstName" :img-path="image" />
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
    <div class="flex flex-col items-center mb-2 text-base">
      <div class="w-80 flex justify-between items-center">
        <text-input
          classes="w-32"
          type="number"
          label="Wzrost"
          min="0"
          step="0.01"
          v-model:value.number="height"
        />
        <radio-group
          :options="heightRadioOptions"
          @change="dynamicHeight"
          classes="ml-8 w-36"
          group-label="Jednostka"
          v-model:selected="heightUnit"
        />
      </div>
      <div class="w-80">
        <Error
          :message="v$.height.$errors[0].$message"
          classes="w-full"
          v-if="v$.height.$error"
        />
      </div>
    </div>
    <div class="flex flex-col items-center mb-4 text-base">
      <div class="w-80 flex justify-between items-center">
        <text-input
          classes="w-32"
          type="number"
          label="Waga"
          min="0"
          step="0.1"
          v-model:value.number="weight"
        />
        <radio-group
          :options="weightRadioOptions"
          @change="dynamicWeight"
          classes="relative ml-8 w-36"
          group-label="Jednostka"
          v-model:selected="weightUnit"
        />
      </div>
      <div class="w-80">
        <Error
          :message="v$.weight.$errors[0].$message"
          classes="w-full"
          v-if="v$.weight.$error"
        />
      </div>
    </div>
    <Button class="border border-black mt-6" label="Zapisz" />
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import useValidate from "@/composable/useValidate";
import useVuelidate from "@vuelidate/core";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import Error from "@/components/common/Error";
import RadioGroup from "@/components/common/RadioGroup";
import TextInput from "@/components/common/TextInput";
import activityOptionData from "@/data/activityOption.json";
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
      rules,
    } = useValidate();
    const validator = useVuelidate(rules, {
      name,
    });
    const avatarFirstName = computed(() => {
      validator.value.name.$touch();
      return validator.value.name.$error ? "" : name.value;
    });
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
    const dynamicHeight = () => {
      if (heightUnit.value === "cm") {
        height.value *= 100;
      }
      if (heightUnit.value === "m") {
        height.value /= 100;
      }
    };
    const dynamicWeight = () => {
      if (weightUnit.value === "kg") {
        weight.value = (weight.value * 0.45359237).toFixed(1);
      }
      if (weightUnit.value === "lbs") {
        weight.value = (weight.value * 2.20462262185).toFixed(1);
      }
    };
    const setUser = () => {
      emit("closeModal");
      store.commit("SET_USER", {
        name: name.value.charAt(0).toUpperCase() + name.value.slice(1),
        lastname:
          lastname.value.charAt(0).toUpperCase() + lastname.value.slice(1),
        height: height.value,
        heightUnit: heightUnit.value,
        weight: weight.value,
        weightUnit: weightUnit.value,
        image: image.value,
        BMI: calculateBMI(),
      });
      store.commit("SET_KCAL_BURNED", {
        walking: (activityOptionData.shoe.value.kcal / 70) * weight.value,
        skating:
          (activityOptionData.rollerblades.value.kcal / 70) * weight.value,
        cycling: (activityOptionData.bicycle.value.kcal / 70) * weight.value,
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
      dynamicHeight,
      dynamicWeight,
      avatarFirstName,
    };
  },
};
</script>
