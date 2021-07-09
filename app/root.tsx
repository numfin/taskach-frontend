import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { MainLayout } from "~/ui/layout/main.layout";

import "tailwindcss/tailwind.css";

export const Root = defineComponent({
  name: "Root",
  render() {
    return (
      <MainLayout>
        <RouterView />
      </MainLayout>
    );
  },
});
