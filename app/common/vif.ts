import { RendererElement, RendererNode, VNode } from 'vue';

export function vif(conditions: [boolean, IFNode][]) {
  for (const [state, el] of conditions)
    if (state) {
      return el;
    }
}

type IFNode = DVNode | JSX.Element | undefined;

type DVNode = VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: unknown;
  }
>[];
