import {
  computed,
  defineComponent,
  PropType,
  ref,
  SetupContext,
  Transition,
  withModifiers,
} from 'vue';

import style from './input-select.module.css';
import { InputTypes } from '../../lib';

import { vif } from '~/shared/lib/vif';
import { Loader, LoaderSize } from '~/shared/ui/loader';

type Events<ItemV = never> = {
  select: (v: ItemV) => void;
};
type Props<T = InputTypes, ItemV = never> = {
  value: T;
  variants: ItemV[];
  on: Events<ItemV>;
  display: (item?: ItemV) => string;
  map: (item: ItemV) => T;
  pending?: boolean;
};

export function InputSelect<T = InputTypes, ItemV = never>(
  props: Props<T, ItemV>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <InputSelectTyped {...(props as any)} />;
}

const InputSelectTyped = defineComponent({
  name: 'InputSelect',
  props: {
    value: {
      validator: () => true,
    },
    on: {
      type: Object as PropType<Events>,
      required: true,
    },
    variants: {
      type: Array,
      required: true,
    },
    display: {
      type: Function,
      required: true,
    },
    map: {
      type: Function,
      required: true,
    },
    pending: Boolean,
  },
  setup(props) {
    const opened = ref(false);
    const pickedItem = computed(() => {
      return props.variants.find((variant) => {
        return props.map(variant) === props.value;
      });
    });

    function onItemSelect(variant: unknown) {
      props.on.select(variant as never);
      closeSelectList();
    }
    function onWrapperClick() {
      opened.value = true;
    }
    function closeSelectList() {
      opened.value = false;
    }

    return () => {
      const selectList = () => (
        <div class="divide-y bg-white rounded max-w-full space-y-1 shadow-md w-full py-1 top-[120%] absolute">
          {props.variants.map((variant) => {
            return (
              <SelectItem
                onClick={withModifiers(
                  () => onItemSelect(variant),
                  ['prevent'],
                )}
                active={props.map(variant) === props.value}
              >
                {props.display(variant)}
              </SelectItem>
            );
          })}
        </div>
      );
      return (
        <div
          class={['w-full', 'text-gray-600', 'relative']}
          v-click-outside={closeSelectList}
        >
          <button
            class="bg-white rounded cursor-pointer h-9 shadow text-left w-full px-4 transition-shadow relative hover:shadow-md block"
            onClick={onWrapperClick}
            type="button"
          >
            <div class="text-xs leading-9">
              {props.display(pickedItem.value)}
            </div>
            <div
              class="transform top-1/2 right-2 -translate-y-1/2 absolute"
              v-show={props.pending}
            >
              <Loader size={LoaderSize.Small} dark />
            </div>
          </button>

          <Transition {...style}>
            {vif([[selectList, opened.value]])}
          </Transition>
        </div>
      );
    };
  },
});

function SelectItem(
  props: {
    active?: boolean;
    onClick?: (e: Event, ...args: unknown[]) => void;
  },
  { slots }: SetupContext,
): JSX.Element {
  const style =
    'border-l-4 border-transparent px-4 py-2 cursor-pointer bg-white transition w-full text-left';
  const activeStyle = 'bg-blue-500 text-white';
  const hoverFocusStyle = props.active
    ? 'hocus:bg-blue-600'
    : 'hocus:bg-gray-100';

  return (
    <button
      type="button"
      class={[
        style,
        hoverFocusStyle,
        {
          [activeStyle]: props.active,
        },
      ]}
      tabindex={0}
    >
      {slots.default?.()}
    </button>
  );
}
