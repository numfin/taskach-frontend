import { defineComponent } from "vue";
import { AppRouteRecord, RouterView } from "vue-router";

import { MainLayout } from "@/ui/layout/main/Main.layout";

interface RouterViewSlotOptions {
  Component: () => JSX.Element;
  route: AppRouteRecord;
}

export const App = defineComponent({
  name: "App",
  render() {
    return (
      <RouterView
        v-slots={{
          default: ({ Component, route }: RouterViewSlotOptions) => {
            const Layout = route.meta.layout ?? MainLayout;
            return <Layout>{Component}</Layout>;
          },
        }}
      />
    );
  },
});
