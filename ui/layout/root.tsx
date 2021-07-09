import { defineComponent, PropType } from "vue";
import { RouteLocationNormalized, RouterView } from "vue-router";
import { MainLayout } from "./main/main.layout";
import { LoginLayout } from "./login/login.layout";

import "tailwindcss/tailwind.css";
import { UserState } from "~/app/user/user.state";
import { LayoutType } from "./layout-type";

export const Root = defineComponent({
  name: "Root",
  setup() {
    return UserState.state;
  },
  render() {
    return (
      <RouterViewWrapper
        slot={(route, Component) => {
          if (route.meta.layout === LayoutType.login) {
            return <LoginLayout>{Component}</LoginLayout>;
          }
          return <MainLayout>{Component}</MainLayout>;
        }}
      />
    );
  },
});

const RouterViewWrapper = defineComponent({
  name: "AppView",
  props: {
    slot: {
      type: Function as PropType<
        (route: RouteLocationNormalized, Component: any) => JSX.Element
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
            Component: any;
          }) => this.slot(route, Component),
        }}
      />
    );
  },
});
