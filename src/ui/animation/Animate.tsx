import { defineComponent, h, PropType, Transition } from "vue";

import { Animatron } from "./animation";

export const Animate = defineComponent({
  name: "Animate",
  props: {
    animation: {
      type: Object as PropType<Animatron>,
      required: true,
    },
    slot: {
      type: Function as PropType<() => JSX.Element>,
      required: true,
    },
    /** v-if alternative */
    visible: {
      type: Boolean,
      default: true,
    },
  },
  render() {
    return (
      <Transition {...this.animation.transition} css={false} appear>
        {this.visible && h(this.slot, { ...this.animation.slotStyle })}
      </Transition>
    );
  },
});
