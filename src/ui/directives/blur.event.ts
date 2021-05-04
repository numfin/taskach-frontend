import { ComponentInternalInstance, onUnmounted, ref, Ref, watch } from "vue";

/** Calls `onBlur` when focus goes away from el */
export function useBlurEvent(
  el: Ref<Element | ComponentInternalInstance | null | undefined>,
  /** You can pass undefined listeners directly here */
  onBlur?: () => void,
  /** Set to false if needs to stop watching blur events */
  active = ref(true),
) {
  const emitter = {
    listener(this: HTMLElement, ev: PointerEvent) {
      const container = el.value;
      if (
        container instanceof HTMLElement &&
        container.contains(ev.target as Node)
      ) {
        return;
      }
      emitter.removeListener();
      onBlur?.();
    },
    removeListener() {
      document.body.removeEventListener("pointerdown", emitter.listener);
    },
    init() {
      if (onBlur) {
        document.body.addEventListener("pointerdown", emitter.listener);
      }
    },
  };
  watch(
    () => active.value,
    (next) => (next ? emitter.init() : emitter.removeListener()),
    {
      immediate: true,
    },
  );
  onUnmounted(emitter.removeListener);

  return emitter;
}
