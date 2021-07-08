import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/home/Home.vue";
import Charts from "@/components/Charts/Charts.vue";
import Login from "@/components/Login/Login.vue";
import { auth } from "@/firebase.js";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/charts",
    name: "Charts",
    component: Charts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (!routes.some((route) => route.path === to.path)) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
