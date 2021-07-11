import { computed, defineComponent, PropType, ref } from 'vue';

import inputStyle from './input.module.css';

import { InputField } from '~/app/common/form/input-field';

interface Slots {
  interactive: JSX.Element;
  label: JSX.Element | string;
}

export const Input = defineComponent({
  name: 'Input',
  props: {
    field: {
      type: InputField,
      required: true,
    },
    slots: {
      type: Object as PropType<Slots>,
      required: true,
    },
  },
  methods: {
    onBlur() {
      this.isFocused = false;
      this.field.validate();
    },
    onFocus() {
      this.isFocused = true;
    },
  },
  setup(props) {
    const isFocused = ref(false);
    return {
      isFocused: computed({
        get() {
          if (props.field.value) {
            return true;
          }
          return isFocused.value;
        },
        set(v: boolean) {
          isFocused.value = v;
        },
      }),
    };
  },
  render() {
    return (
      <div>
        <label
          class="relative block"
          onFocusin={this.onFocus}
          onFocusout={this.onBlur}
        >
          <span
            class={[
              'block text-gray-400 bg-white rounded px-1 filter font-sans absolute left-0 top-0 transform transition-all ease-out text-xs translate-x-3 whitespace-nowrap overflow-hidden overflow-ellipsis',
              inputStyle.input,
              {
                '-translate-y-2': this.isFocused,
                'translate-y-3.5': !this.isFocused,
              },
            ]}
          >
            {this.slots.label}
          </span>
          <div class="rounded border-gray-200 border-2 py-2 px-4 focus-within:border-gray-400">
            {this.slots?.interactive}
          </div>
        </label>
        <div class="text-red-500">
          {this.field.errors.map((err) => {
            return <span class="block text-xs first:mt-2">{err}</span>;
          })}
        </div>
      </div>
    );
  },
});
