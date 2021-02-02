import { SprintPage } from "/src/domains/sprint/Sprint.page";
import { createPage } from "/src/modules/router/CreatePage";

export const RootPage = createPage({
  path: "/",
  component: () => import("./Root.view.svelte"),
  children: [SprintPage],
});
