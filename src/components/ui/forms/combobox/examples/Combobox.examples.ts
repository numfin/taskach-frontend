import { createExample } from "/examples/createExample";

export const ComboboxExamples = [
  createExample({
    name: "Combobox",
    component: () => import("./Combobox.examples.svelte"),
  }),
];
