import { computed, defineComponent, PropType, ref, TransitionGroup } from 'vue';

import style from './input.module.scss';
import { InputTypes, InputField } from '..';
import { InputProps, Slots } from './input.config';

export function Input<V extends InputTypes>(props: InputProps<V>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <InputTyped {...(props as any)} />;
}

const InputTyped = defineComponent({
  name: 'InputTyped',
  props: {
    field: {
      type: InputField,
      required: true,
    },
    slots: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Object as PropType<Slots<any>>,
      required: true,
    },
  },
  setup(props) {
    const isFocused = ref(false);
    const isFocusedRly = computed<boolean>(() => {
      if (props.field.value) {
        return true;
      }
      return isFocused.value;
    });
    function onBlur() {
      isFocused.value = false;
      props.field.validate();
    }
    function onFocus() {
      isFocused.value = true;
    }

    return () => (
      <div>
        <label class="relative block" onFocusin={onFocus} onFocusout={onBlur}>
          <span
            class={[
              'block text-gray-400 bg-white rounded px-1 filter font-sans absolute left-0 top-0 transform transition-all ease-out text-xs translate-x-3 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[92%]',
              {
                '-translate-y-2': isFocusedRly.value,
                'translate-y-3.5': !isFocusedRly.value,
              },
            ]}
          >
            {props.slots.label}
          </span>
          <div class="rounded border-gray-200 border-2 py-2 px-4 focus-within:border-gray-400">
            {props.slots.input({
              value: props.field.value,
              onInput: props.field.set,
            })}
          </div>
        </label>

        <TransitionGroup tag="div" {...style}>
          {props.field.errors.map((err) => {
            return (
              <div class="mt-2 text-xs text-red-500" key={err}>
                {err}
              </div>
            );
          })}
        </TransitionGroup>
      </div>
    );
  },
});
