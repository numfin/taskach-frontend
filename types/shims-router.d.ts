/* eslint-disable */
import { DefineComponent } from "vue";

export {};
declare module "vue-router" {
  export interface RouteMeta {
    layout?: DefineComponent<{}, {}, any>;
    title: () => string;
  }
  export type AppRouteRecord = RouteRecordRaw & {
    meta: RouteMeta;
    name: Symbol;
    children?: AppRouteRecord[];
  };
}
