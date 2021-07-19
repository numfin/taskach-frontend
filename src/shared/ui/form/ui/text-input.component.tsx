import { defineComponent, PropType, withModifiers } from 'vue';

type Events = {
  input: (v: string) => void;
};

export const InputText = defineComponent({
  name: 'InputText',
  props: {
    value: {
      type: String,
      required: true,
    },
    on: {
      type: Object as PropType<Events>,
      required: true,
    },
  },
  render() {
    return (
      <input
        {...{
          type: 'text',
          ...this.$attrs,
        }}
        class={['w-full', 'outline-none', 'text-gray-600']}
        value={this.value}
        onInput={withModifiers(
          (event: { target: HTMLInputElement }) => {
            this.on.input(event.target.value);
          },
          ['prevent'],
        )}
      />
    );
  },
});
