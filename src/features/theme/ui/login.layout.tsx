import { defineComponent } from 'vue';

import { vif } from '~/shared/lib/vif';
import { Loader, LoaderSize } from '~/shared/ui/loader';

export const LoginLayout = defineComponent({
  name: 'LoginLayout',
  props: {
    loading: Boolean,
  },
  render() {
    return (
      <div class="bg-gradient-to-br to-transparent flex min-h-screen from-blue-700 to-blue-200 justify-center items-center">
        {vif([
          [() => <Loader size={LoaderSize.Big} />, this.loading],
          [() => this.$slots.default?.(), !this.loading],
        ])}
      </div>
    );
  },
});
