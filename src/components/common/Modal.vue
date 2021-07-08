<template>
  <div class="fixed z-50 top-0 left-0 bg-black bg-opacity-60 h-screen w-screen">
    <div
      @click.self="$emit('closeModal')"
      class="flex justify-center items-center w-full h-full"
    >
      <div class="relative flex flex-col bg-white">
        <button
          @click="$emit('closeModal')"
          class="w-4 absolute right-12 top-3 sm:right-4"
        >
          x
        </button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>
