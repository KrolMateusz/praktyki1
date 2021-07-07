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
      <TextInput v-model:value="password" placeholder="Hasło" />
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
import { ref } from "vue";
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
    const email = ref("");
    const password = ref("");
    const isModalOpened = ref(false);
    const store = useStore();

    const handleSubmit = () => {
      if (!email.value || !password.value) return;
      store.dispatch("login", { email, password });
    };
    return {
      email,
      password,
      isModalOpened,
      handleSubmit,
      handleModalVisibility: () => (isModalOpened.value = !isModalOpened.value),
    };
  },
};
</script>

<style scoped></style>
