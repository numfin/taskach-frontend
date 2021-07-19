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
      <div class="min-h-screen bg-gradient-to-br from-blue-500 to-transparent flex justify-center items-center">
        {vif([
          [this.loading, <Loader size={LoaderSize.Big} />],
          [!this.loading, this.$slots.default?.()],
        ])}
      </div>
    );
  },
});
