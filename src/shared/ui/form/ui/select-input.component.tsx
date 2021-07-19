import { withModifiers, defineComponent, PropType } from 'vue';

import { Input } from './input.component';

import { InputField } from '~/shared/ui/form';

export const InputSelect = defineComponent({
  name: 'InputSelect',
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
          input: ({ onInput, value }) => (
            <input
              {...{
                type: 'text',
                ...this.$attrs,
              }}
              class={['w-full', 'outline-none', 'text-gray-600']}
              value={value}
              onInput={withModifiers(
                (event: { target: HTMLInputElement }) => {
                  onInput(event.target.value);
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

export const SelectWrapper = defineComponent({
  name: 'SelectWrapper',
  render() {
    return <div></div>;
  },
});

export const SelectSearch = defineComponent({
  name: 'SelectSearch',

  render() {
    return <div></div>;
  },
});
