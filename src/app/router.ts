import { createRouter, createWebHistory, Router } from 'vue-router';

import { LoginRoute } from '~/routes/login/login.route';
import { RootRoute } from '~/routes/root.route';

export function createAppRouter(): Router {
  return createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
      return savedPosition ?? { top: 0, left: 0 };
    },
    routes: [RootRoute, LoginRoute],
  });
}
