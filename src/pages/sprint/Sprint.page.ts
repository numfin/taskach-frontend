import { createPage } from "/src/router/CreatePage";

export const SprintPage = createPage({
  path: "/sprint",
  component: () => import("./Sprint.view.svelte"),
});
