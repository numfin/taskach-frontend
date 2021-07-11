import { defineComponent, PropType } from 'vue';

import { Loader, LoaderSize } from '../loader/loader.component';
import { ButtonSize, ButtonType } from './button';

interface Events {
  click: (e: Event) => void;
}

export const Button = defineComponent({
  name: 'Button',
  props: {
    on: {
      type: Object as PropType<Events>,
      default: () => ({}),
    },
    type: {
      type: Number as PropType<ButtonType>,
      default: ButtonType.normal,
    },
    size: {
      type: Number as PropType<ButtonSize>,
      default: ButtonSize.normal,
    },
    loading: Boolean,
  },
  render() {
    return (
      <button
        class={[
          'px-4 py-2 rounded text-white flex justify-center items-center',
          {
            'bg-gray-500': this.type === ButtonType.normal,
            'bg-blue-500': this.type === ButtonType.action,
            'bg-red-500': this.type === ButtonType.error,
          },
        ]}
        onClick={this.on.click}
      >
        <div class="absolute">
          <Loader size={LoaderSize.Small} v-show={this.loading} class="" />
        </div>
        <div
          class={{
            'opacity-0': this.loading,
          }}
        >
          {this.$slots.default?.()}
        </div>
      </button>
    );
  },
});
