<template>
  <form
    class="
      border border-dark-grey
      p-8
      h-full
      w-full
      shadow-lg
      md:max-w-3xl
      lg:max-h-1/2
      max-h-1/2
      md:items-center
    "
  >
    <slot />
  </form>
</template>

<script>
export default {
  name: "FormWrapper",
};
</script>

<style scoped></style>
