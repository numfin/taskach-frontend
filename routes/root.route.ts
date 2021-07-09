import { RouteRecordRaw } from "vue-router";

export const RootView: RouteRecordRaw = {
  path: "/",
  component: () => import("./root.view"),
};
