/* eslint-disable */
import { ComponentCustomProps, HTMLAttributes } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProps extends HTMLAttributes {
    autocomplete?: string,
    type?: string
  }
  interface IntrinsicAttributes {
    a: string
  }
}