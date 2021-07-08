<template>
  <FormWrapper @submit.prevent="handleSubmit">
    <p class="text-center">Załóż konto</p>
    <label>Imię</label>
    <TextInput v-model:value="name" placeholder="Wprowadź imię" />
    <label>Nazwisko</label>
    <TextInput v-model:value="surname" placeholder="Wprowadź nazwisko" />
    <label>Email</label>
    <TextInput v-model:value="email" placeholder="Wprowadź swój mail" />
    <label>Hasło</label>
    <TextInput
      v-model:value="password"
      placeholder="Wprowadź hasło"
      type="password"
    />
    <Button :isBig="true" class="mt-6" type="submit" label="Zarejestruj się!" />
  </FormWrapper>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs } from "vue";
import FormWrapper from "@/components/Login/FormWrapper";
import TextInput from "@/components/common/TextInput";
import Button from "@/components/common/Button";
export default {
  name: "RegisterForm",
  components: { Button, TextInput, FormWrapper },
  setup() {
    const formsValue = reactive({
      name: "",
      surname: "",
      email: "",
      password: "",
    });
    const store = useStore();

    const handleSubmit = () => {
      store.dispatch("signup", formsValue);
    };

    return {
      handleSubmit,
      ...toRefs(formsValue),
    };
  },
};
</script>

<style scoped></style>
