import { defineComponent } from "vue";

import { MainHeader } from "./MainHeader";

export const MainLayout = defineComponent({
  name: "MainLayout",
  render() {
    return (
      <main class="bg-gray-200 h-screen w-full">
        <MainHeader />
        {this.$slots.default?.()}
      </main>
    );
  },
});
