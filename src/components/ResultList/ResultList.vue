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
        :key="index"
        @click="clickHandler(index)"
        id="index"
        v-for="(restaurant, index) in restaurants"
      >
        <span class="font-bold px-2">{{ restaurant.name }}</span> <br />

        <span class="px-1">
          {{ restaurant.address.street }}, {{ restaurant.address.city }},
          {{ restaurant.address.postalCode }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ResultList",
  props: {
    restaurants: {
      type: Array,
      validator(restaurants) {
        return restaurants.every(
          (restaurant) =>
            "address" in restaurant &&
            "name" in restaurant &&
            "position" in restaurant
        );
      },
    },
  },
  emits: ["selectRestaurant"],
  setup(props, { emit }) {
    const isActive = ref(null);

    const clickHandler = function (index) {
      this.isActive = index;
      emit("selectRestaurant", index);
    };

    return {
      isActive,
      clickHandler,
    };
  },
};
</script>
