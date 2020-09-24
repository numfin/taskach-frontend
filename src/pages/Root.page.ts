import { createPage } from "/src/router/CreatePage";
import { SprintPage } from "./sprint/Sprint.page";

export const RootPage = createPage({
  path: "/",
  component: () => import("./Root.view.svelte"),
  children: [SprintPage],
  query: {
    projectId: "",
    sprintId: "",
  },
});
