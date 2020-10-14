import { Router } from "/src/router/CreateRouter";
import { RootPage } from "./Root.page";

export const router = new Router([RootPage]);

export interface IGlobalQuery {
  projectId: string;
  sprintId: string;
}
