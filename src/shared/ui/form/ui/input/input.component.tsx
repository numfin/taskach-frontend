import { computed, defineComponent, PropType, ref, TransitionGroup } from 'vue';

import style from './input.module.scss';
import { InputProps, Slots } from './input.config';

import { InputTypes, FieldInput, FieldSelect } from '~/shared/ui/form/lib';

export function Input<V, ItemV>(props: InputProps<V, ItemV>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <InputTyped {...(props as any)} />;
}

const InputTyped = defineComponent({
  name: 'InputTyped',
  props: {
    field: {
      type: [FieldInput, FieldSelect],
      required: true,
    },
    slots: {
      type: Object as PropType<Slots>,
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

    return () => {
      const label = () => {
        if (!props.slots.label) {
          return;
        }
        let title = '';
        if (typeof props.slots.label === 'string') {
          title = props.slots.label;
        } else if (typeof props.slots.label === 'object') {
          title = props.slots.label.el?.innerText ?? '';
        }
        if (props.field instanceof FieldInput) {
          return (
            <div
              class={[
                'text-gray-400 bg-white rounded px-1 filter font-sans absolute left-0 top-0 transform transition-all ease-out text-xs translate-x-3 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[92%]',
                {
                  '-translate-y-2': isFocusedRly.value,
                  'translate-y-3': !isFocusedRly.value,
                },
              ]}
              title={title}
            >
              {props.slots.label}
            </div>
          );
        }
        return (
          <div
            class="bg-white rounded shadow text-xs max-w-[86%] transform px-1 text-gray-400 z-10 translate-x-3 translate-y-[-50%] absolute whitespace-nowrap overflow-hidden overflow-ellipsis"
            title={title}
            // v-show={props.field.value !== undefined}
          >
            {props.slots.label}
          </div>
        );
      };

      return (
        <div>
          <label class="relative block" onFocusin={onFocus} onFocusout={onBlur}>
            {label()}
            {props.slots.input({
              value: props.field.value as InputTypes,
              set: props.field.set,
            })}
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
    };
  },
});
