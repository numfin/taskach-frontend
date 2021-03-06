import "@/main.css";

import { createApp } from "vue";

import { App } from "@/components/App";
import { router } from "@/router/router";

createApp(App).use(router).mount(".taskach-app");

import("@/registerServiceWorker");
