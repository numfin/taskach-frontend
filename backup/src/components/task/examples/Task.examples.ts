import { createExample } from "/examples/createExample";

export const TaskExamples = [
  createExample({
    name: "Task",
    component: () => import("./Task.examples.svelte"),
  }),
  createExample({
    name: "Task process",
    component: () => import("./TaskProcess.examples.svelte"),
  }),
  createExample({
    name: "Stories",
    component: () => import("./Stories.examples.svelte"),
  }),
];
