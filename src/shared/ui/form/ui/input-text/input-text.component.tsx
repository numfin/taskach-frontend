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
  setup(props, { attrs }) {
    return () => (
      <input
        {...{
          type: 'text',
          ...attrs,
        }}
        class={[
          'w-full',
          'outline-none',
          'text-gray-600',
          'py-2 px-4',
          'bg-white',
          'rounded',
          'ring-2 ring-gray-200 focus-within:ring-gray-400',
        ]}
        value={props.value}
        onInput={withModifiers(
          (event: { target: HTMLInputElement }) => {
            props.on.input(event.target.value);
          },
          ['prevent'],
        )}
      />
    );
  },
});
