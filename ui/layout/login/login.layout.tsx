import { defineComponent } from 'vue';

export const LoginLayout = defineComponent({
  name: 'LoginLayout',
  render() {
    return <div class="min-h-screen">{this.$slots.default?.()}</div>;
  },
});
