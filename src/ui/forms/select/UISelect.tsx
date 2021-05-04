import { defineComponent, PropType } from "vue";

import { UIDropdown } from "./UIDropdown";

interface SelectItem {
  name: string;
  uniqueValue: number | string;
}

type Extractor<T> = (item: T) => SelectItem;

interface Events<T> {
  open?: () => void;
  close?: () => void;
  pick: (item: T, index: number) => void;
}

interface Slots<T> {
  item?: (item: T, index: number) => JSX.Element;
  label?: () => JSX.Element;
}

export function UISelectFactory<T>(extract: Extractor<T>) {
  return defineComponent({
    name: "UISelect",
    props: {
      items: {
        type: Array as PropType<T[]>,
        required: true,
      },
      value: {
        type: [Object, Number, String] as PropType<T>,
        default: () => null,
      },
      on: {
        type: Object as PropType<Events<T>>,
        required: true,
      },
      slots: {
        type: Object as PropType<Slots<T>>,
        default: () => ({}),
      },
      placeholder: String,
    },
    data() {
      return {
        isOpened: false,
      };
    },
    computed: {
      itemList(): JSX.Element[] {
        return this.items.map((item, index) => {
          return this.getItemBody(item, index);
        });
      },
      currentValue(): SelectItem | null {
        return this.value ? extract(this.value as T) : null;
      },
    },
    methods: {
      getItemBody(item: T, index: number) {
        if (this.slots.item) {
          return this.slots.item(item, index);
        }
        const { name } = extract(item);
        return (
          <button
            class="px-4 py-3 text-left border-t border-gray-lighter focus:outline-none focus:ring-brand-light focus:ring-2 w-full first:border-t-0 first:rounded-t last:rounded-b"
            onClick={() => this.handlePick(item, index)}
          >
            {name}
          </button>
        );
      },
      handlePick(item: T, index: number) {
        if (this.currentValue?.uniqueValue !== extract(item).uniqueValue) {
          this.on.pick(item, index);
        }
        this.handleClose();
      },
      handleOpen() {
        this.isOpened = true;
        this.on.open?.();
      },
      handleClose() {
        this.isOpened = false;
        this.on.close?.();
      },
    },
    render() {
      return (
        <UIDropdown
          isOpened={this.isOpened}
          on={{ open: this.handleOpen, close: this.handleClose }}
          slots={{
            label: this.slots.label,
            body: () => this.itemList,
            value: () => this.currentValue?.name ?? "",
          }}
          placeholder={this.placeholder}
          adaptive
        />
      );
    },
  });
}
