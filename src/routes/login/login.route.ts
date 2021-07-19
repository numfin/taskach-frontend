import { RouteRecordRaw } from 'vue-router';

import { LoginLayout } from '~/features/theme';

export const LoginRoute: RouteRecordRaw = {
  name: 'Login',
  path: '/login',
  component: () => import('./login.view'),
  meta: {
    layout: LoginLayout,
  },
};
