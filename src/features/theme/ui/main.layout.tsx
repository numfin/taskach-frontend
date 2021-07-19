import { defineComponent } from 'vue';

import { Header } from './header';

export const MainLayout = defineComponent({
  name: 'MainLayout',
  render() {
    return (
      <div>
        <Header />
        {this.$slots.default?.()}
      </div>
    );
  },
});
