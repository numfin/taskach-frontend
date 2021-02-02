import { AppRouteRecord } from "vue-router";

import { RootView } from "./root.view";

export const RootRoute: AppRouteRecord = {
  name: Symbol("RootRoute"),
  path: "/",
  meta: {
    title: () => "Taskach",
  },
  component: RootView,
};
