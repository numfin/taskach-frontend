import { createPage } from "../../modules/router/CreatePage";

export const SprintPage = createPage({
  path: "/sprint",
  component: () => import("./Sprint.view.svelte"),
  query: {
    sprintId: "",
  },
});
