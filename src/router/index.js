import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/home/Home.vue";

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
  if (!routes.some((route) => route.path === to.path)) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
