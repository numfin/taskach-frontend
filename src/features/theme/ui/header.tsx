import { defineComponent } from 'vue';

import { Logo } from '~/shared/ui/logo';

export const Header = defineComponent({
  name: 'Header',
  render() {
    return (
      <div class="bg-gray-800">
        <div class="max-w-6xl flex p-4 mx-auto">
          <Logo />
          <div class="selects outline-red-500"></div>
          <div class="userspace outline-red-500"></div>
        </div>
      </div>
    );
  },
});
