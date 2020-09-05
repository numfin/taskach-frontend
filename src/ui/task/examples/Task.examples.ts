import { createExample } from "/examples/createExample";

export const TaskExamples = [
  createExample({
    name: "Task",
    component: () => import("./Task.examples.svelte"),
  }),
];
