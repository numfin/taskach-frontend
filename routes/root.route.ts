import { RouteRecordRaw } from 'vue-router';

export const RootRoute: RouteRecordRaw = {
  name: 'Root',
  path: '/',
  component: () => import('./root.view'),
};
