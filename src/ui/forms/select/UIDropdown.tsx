import { defineComponent, PropType, ref, toRefs } from "vue";

import { IconSelect } from "@/ui/icons/IconSelect";
import { AnimationDropdown } from "@/ui/animation/dropdown.animation";
import { Animate } from "@/ui/animation/Animate";
import { UILabel } from "../label/UILabel";
import { useBlurEvent } from "@/ui/directives/blur.event";

interface Slots {
  body: () => JSX.Element;
  label?: () => JSX.Element;
  value?: () => JSX.Element;
}

interface Events {
  open?: () => void;
  close?: () => void;
  focus?: () => void;
  blur?: (e: FocusEvent) => void;
  keypress?: {
    down?: () => void;
    up?: () => void;
    enter?: () => void;
  };
}

export const UIDropdown = defineComponent({
  name: "UIDropdown",
  emits: ["update:isOpened"],
  props: {
    slots: {
      type: Object as PropType<Slots>,
      required: true,
    },
    on: {
      type: Object as PropType<Events>,
      default: () => ({}),
    },
    isOpened: Boolean,
    required: Boolean,
    /** Напр. "Выберите вариант" */
    placeholder: {
      type: String,
      default: "Pick item",
    },
    /** w-full min-w */
    adaptive: Boolean,
  },
  computed: {
    selectButton() {
      const IconOpen = () => (
        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
          <IconSelect />
        </div>
      );
      return (
        <button
          class={[
            "group relative w-full rounded cursor-pointer focus:outline-none",
            "border border-gray-300 shadow-sm",
            "pl-3 pr-8 py-2",
            "text-gray-300 hover:text-gray-500",
            "focus:border-gray-500 focus:text-gray-500",
            {
              ["z-20"]: this.isOpened,
            },
          ]}
          onClick={this.isOpened ? this.close : this.open}
          onKeydown={(e) => {
            if (e.code === "ArrowDown") {
              e.preventDefault();
              this.on.keypress?.down?.();
            }
            if (e.code === "ArrowUp") {
              e.preventDefault();
              this.on.keypress?.up?.();
            }
            if (e.code === "Enter") {
              e.preventDefault();
              if (!this.isOpened) {
                this.on.open?.();
              } else {
                this.on.keypress?.enter?.();
              }
            }
            if (e.code === "Escape") {
              e.preventDefault();
              if (this.isOpened) {
                this.on.close?.();
              }
            }
          }}
        >
          <span
            style={{ lineHeight: "0.875rem" }}
            class={[
              "block truncate text text-left pt-px",
              {
                ["text-gray-600"]: this.slots.value,
                ["text-gray-400"]: !this.slots.value,
              },
            ]}
          >
            {this.slots.value || this.placeholder}
          </span>
          {!this.isOpened && <IconOpen />}
        </button>
      );
    },
    selectBody(): JSX.Element {
      return (
        <Animate
          visible={this.isOpened}
          animation={AnimationDropdown()}
          slot={() => (
            <div
              class={[
                "absolute mt-1 rounded bg-white shadow-lg z-10",
                {
                  ["min-w-min w-full"]: this.adaptive,
                },
              ]}
            >
              {this.slots.body()}
            </div>
          )}
        />
      );
    },
  },
  setup(props) {
    const close = () => props.on.close?.();
    const open = () => props.on.open?.();

    const containerRef = ref<Element>();
    useBlurEvent(containerRef, close, toRefs(props).isOpened);

    return {
      containerRef,
      close,
      open,
    };
  },
  render() {
    return (
      <div
        class="relative w-full"
        ref={(v) => (this.containerRef = v as Element)}
      >
        {UILabel(this.slots.label, this.required)}
        {this.selectButton}
        {this.selectBody}
      </div>
    );
  },
});
