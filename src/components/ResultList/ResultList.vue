<template>
  <div>
    <ul>
      <li
        class="
          border-4
          rounded-xl
          border-main
          m-2
          text-base
          w-full
          hover:bg-gray-300
          cursor-pointer
        "
        :class="{ 'bg-main text-white hover:bg-main': isActive === index }"
        @click="clickHandler(index)"
        id="index"
        v-for="(result, index) in results"
        :key="index"
      >
        <span class="font-bold px-2">{{ result.name }}</span> <br />

        <span class="px-1">
          {{ result.address.street }}, {{ result.address.city }},
          {{ result.address.postalCode }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ResultList",

  methods: {
    clickHandler(index) {
      this.isActive = index;
      console.log(index);
    },
  },

  setup() {
    const isActive = ref(-1);
    const results = [
      {
        address: {
          street: "Aleje armi krajowej",
          city: "Wrocław",
          postalCode: "50-541",
        },
        name: "Carbon",
      },
      {
        address: {
          street: "Centrum",
          city: "Wrocław",
          postalCode: "50-213",
        },
        name: "Center Pizza",
      },
      {
        address: {
          street: "Aleje armi krajowej",
          city: "Wrocław",
          postalCode: "50-541",
        },
        name: "Carbon",
      },
      {
        address: {
          street: "Centrum",
          city: "Wrocław",
          postalCode: "50-213",
        },
        name: "Center Pizza",
      },
      {
        address: {
          street: "Aleje armi krajowej",
          city: "Wrocław",
          postalCode: "50-541",
        },
        name: "Carbon",
      },
      {
        address: {
          street: "Centrum",
          city: "Wrocław",
          postalCode: "50-213",
        },
        name: "Center Pizza",
      },
    ];
    return { results, isActive };
  },
};
</script>
