import { RouteRecordRaw } from 'vue-router';

import { LoginLayout } from './login.layout';

export const LoginRoute: RouteRecordRaw = {
  name: 'Login',
  path: '/login',
  component: () => import('./login.view'),
  meta: {
    layout: LoginLayout,
  },
};
