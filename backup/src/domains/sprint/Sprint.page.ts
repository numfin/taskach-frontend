import { createPage } from "/src/modules/router/CreatePage";

export const SprintPage = createPage({
  path: "/sprint",
  component: () => import("./Sprint.view.svelte"),
  query: {
    sprintId: "",
  },
});
