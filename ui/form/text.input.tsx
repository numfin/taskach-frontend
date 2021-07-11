import { defineComponent, PropType, withModifiers } from 'vue';

import { Input } from './input';

import { InputField } from '~/app/common/form/input-field';

export const InputText = defineComponent({
  name: 'InputText',
  props: {
    field: {
      type: InputField as PropType<InputField<string>>,
      required: true,
    },
    label: {
      type: [Object, String] as PropType<JSX.Element | string>,
      required: true,
    },
  },
  render() {
    return (
      <Input
        field={this.field}
        slots={{
          label: this.label,
          interactive: (
            <input
              {...{
                type: 'text',
                ...this.$attrs,
              }}
              class={['w-full', 'outline-none', 'text-gray-600']}
              value={this.field.value}
              onInput={withModifiers(
                (event: { target: HTMLInputElement }) => {
                  this.field.value = event.target.value;
                },
                ['prevent'],
              )}
            />
          ),
        }}
      />
    );
  },
});
