import { RouteRecordRaw } from "vue-router";
import { LayoutType } from "~/ui/layout/layout-type";

export const RootView: RouteRecordRaw = {
  path: "/",
  component: () => import("./root.view"),
  meta: {
    layout: LayoutType.login,
  },
};
