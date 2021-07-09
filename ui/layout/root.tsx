import { defineComponent, PropType } from 'vue';
import { RouteLocationNormalized, RouterView } from 'vue-router';

import { LoginLayout } from './login/login.layout';
import { MainLayout } from './main/main.layout';
import { LayoutType } from './layout-type';

import { UserState } from '~/app/user/user.state';

import 'tailwindcss/tailwind.css';

export const Root = defineComponent({
  name: 'Root',
  setup() {
    return UserState.state;
  },
  render() {
    return (
      <RouterViewWrapper
        slot={(route, Component) => {
          if (route.meta.layout === LayoutType.Login) {
            return <LoginLayout>{Component}</LoginLayout>;
          }
          return <MainLayout>{Component}</MainLayout>;
        }}
      />
    );
  },
});

const RouterViewWrapper = defineComponent({
  name: 'AppView',
  props: {
    slot: {
      type: Function as PropType<
        (route: RouteLocationNormalized, Component: unknown) => JSX.Element
      >,
      required: true,
    },
  },
  render() {
    return (
      <RouterView
        v-slots={{
          default: ({
            route,
            Component,
          }: {
            route: RouteLocationNormalized;
            Component: unknown;
          }) => this.slot(route, Component),
        }}
      />
    );
  },
});
