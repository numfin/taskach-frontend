import { createRouter, createWebHistory } from 'vue-router';

import { RootView } from '~/routes/root.route';

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
      return savedPosition ?? { top: 0, left: 0 };
    },
    routes: [RootView],
  });
}
