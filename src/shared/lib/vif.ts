import { RendererElement, RendererNode, VNode } from 'vue';

export function vif(conditions: [() => IFNode, boolean][]) {
  for (const [el, state] of conditions) {
    if (state) {
      return el();
    }
  }
  return null;
}

type IFNode = DVNode | JSX.Element | undefined;

type DVNode = VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: unknown;
  }
>[];
