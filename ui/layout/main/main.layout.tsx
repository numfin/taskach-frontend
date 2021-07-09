import { defineComponent } from 'vue';

export const MainLayout = defineComponent({
  name: 'MainLayout',
  render() {
    return <div>{this.$slots.default?.()}</div>;
  },
});
