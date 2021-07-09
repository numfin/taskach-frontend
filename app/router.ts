import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RootView } from "~/routes/root.route";

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
      return savedPosition ?? { top: 0, left: 0 };
    },
    routes: [RootView],
  });
}

// function getViews(): RouteRecordRaw[] {
//   const routes: RouteRecordRaw[] = [];
//   const views = import.meta.globEager("/views/**/*.view.ts");
//   for (const module of Object.values(views)) {
//     routes.push(...Object.values(module));
//   }
//   return routes;
// }
