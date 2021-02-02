import { defineComponent } from "vue";

export const MainLayout = defineComponent({
  name: "MainLayout",
  render() {
    return (
      <main>
        <header>header</header>
        {this.$slots.default?.()}
      </main>
    );
  },
});
