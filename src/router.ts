import { Router } from "/src/modules/router/CreateRouter";
import { RootPage } from "/src/domains/root/Root.page";

export const router = new Router([RootPage], { projectId: "" });
