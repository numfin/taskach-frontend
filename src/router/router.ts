import { createRouter, createWebHistory } from "vue-router";

import { RootRoute } from "@/views/root.route";

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [RootRoute],
});
