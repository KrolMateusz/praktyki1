<template>
  <div
    class="
      text-base
      w-screen
      h-screen
      flex
      justify-center
      py-14
      px-10
      md:self-center
    "
  >
    <FormWrapper @submit.prevent="handleSubmit">
      <p class="text-center">Zaloguj się, aby kontynuować</p>
      <label>Login</label>
      <TextInput v-model:value="email" placeholder="Login" />
      <label>Hasło</label>
      <TextInput v-model:value="password" placeholder="Hasło" type="password" />
      <div class="mt-14 flex flex-col items-center">
        <Button type="submit" :isBig="true" label="Zaloguj się!" />
        <Button
          :isWarning="true"
          :isBig="true"
          class="mt-14"
          label="Załóż konto"
          @click.prevent="handleModalVisibility"
        />
      </div>
    </FormWrapper>
    <Modal @close-modal="handleModalVisibility" v-if="isModalOpened">
      <RegisterForm />
    </Modal>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import TextInput from "@/components/common/TextInput.vue";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import FormWrapper from "./FormWrapper";
import RegisterForm from "./RegisterForm";
export default {
  name: "Login",
  components: {
    RegisterForm,
    FormWrapper,
    TextInput,
    Button,
    Modal,
  },
  setup() {
    const formValues = reactive({ email: "", password: "" });
    const isModalOpened = ref(false);
    const store = useStore();

    const handleSubmit = () => {
      if (!formValues.email || !formValues.password) return;

      store.dispatch("login", formValues);
    };
    return {
      isModalOpened,
      formValues,
      ...toRefs(formValues),
      handleSubmit,
      handleModalVisibility: () => (isModalOpened.value = !isModalOpened.value),
    };
  },
};
</script>

<style scoped></style>
