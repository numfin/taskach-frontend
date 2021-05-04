import { createAnimatron } from "./animation";

export const AnimationDropdown = (ms = 200) =>
  createAnimatron({
    slotStyle: {
      class: "transform transition",
      style: {
        transitionDuration: `${ms}ms`,
      },
    },
    transition: {
      onBeforeEnter(el) {
        el.classList.add("opacity-0", "-translate-y-1/2");
      },
      onEnter(_, done) {
        setTimeout(done, 0);
      },
      onAfterEnter(el) {
        el.classList.add("opacity-100", "translate-y-0");
        el.classList.remove("opacity-0", "-translate-y-1/2");
      },
      onBeforeLeave(el) {
        el.classList.add("opacity-100", "translate-y-0");
      },
      onLeave(el, done) {
        el.classList.add("opacity-0", "-translate-y-1/2");
        el.classList.remove("opacity-100", "translate-y-0");
        setTimeout(done, ms);
      },
    },
  });
