import { defineComponent } from 'vue';

import { IconCart } from '~/shared/ui/icons';

export const Logo = defineComponent({
  name: 'Logo',
  render() {
    return (
      <div class="px-4 h-[44px] h-[34px] bg-rose-400 flex justify-center items-center gap-3">
        <IconCart size={20} />
        <span class="uppercase text-xs text-white font-bold leading-[34px]">
          Taskach
        </span>
      </div>
    );
  },
});
