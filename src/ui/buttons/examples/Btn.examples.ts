import { createExample } from "/examples/createExample";

export const ButtonExamples = [
  createExample({
    name: "Btn",
    component: () => import("./Btn.examples.svelte"),
  }),
];
