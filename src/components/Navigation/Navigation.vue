<template>
  <nav class="px-40 py-8 bg-blue-300">
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="about">About</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.link {
        @apply mr-12 text-white text-3xl relative

}



.router-link-active.router-link-exact-active.link::after {
    content: '';
    @apply absolute w-10 h-10 bg-white rounded-full inset-y-0
}
</style>
