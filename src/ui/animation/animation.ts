export type Animatron = {
  slotStyle?: Partial<{
    class: string;
    style: Record<string, string>;
  }>;
  transition: Partial<{
    onBeforeEnter: (el: Element) => void;
    onEnter: (el: Element, done: () => void) => void;
    onAfterEnter: (el: Element) => void;
    onBeforeLeave: (el: Element) => void;
    onLeave: (el: Element, done: () => void) => void;
  }>;
};

export function createAnimatron(options: Animatron): Animatron {
  return options;
}
