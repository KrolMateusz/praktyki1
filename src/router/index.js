import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/charts",
    name: "Charts",

    component: () => import("@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  next()
})

export default router;
