<template>
  <div class="w-80">
    <div class="flex p-8">
      <a href="#"
        ><img v-bind:src="img" alt="" class="w-24 h-24 rounded-full"
      /></a>
      <div class="flex flex-col p-3">
        <p class="font-medium text-5xl">Jan</p>
        <p class="text-2xl">Kowalski</p>
      </div>
    </div>
    <div class="flex flex-col p-3">
      <p>Podstawowe informacje:</p>
      <p>Waga: <span class="font-medium">weight</span></p>
      <p>Wzrost: <span class="font-medium">height</span></p>
      <p>
        BMI: <span class="font-medium">{{ bmi() }}</span>
      </p>
      <p>
        FFMI: <span class="font-medium">ffmi kg/m<sup>2</sup></span>
      </p>
    </div>
    <div class="infoContainer p-3">
      <p>Spalasz:</p>
      <p>Wolno: <span class="font-medium">0.10 kg/h</span></p>
      <p>Szybko: <span class="font-medium">0.80 kg/h</span></p>
    </div>
  </div>
</template>

<script>
export default {
  // props: [name, surname, weight, height],
  data() {
    const imgLink = require("../../assets/avatar.jpg");
    const weight = 80;
    const height = 1.8;
    function bmi() {
      return (weight / Math.pow(height, 2)).toFixed(1);
    }
    return { img: imgLink, bmi };
  },
};
</script>

<style>
</style>