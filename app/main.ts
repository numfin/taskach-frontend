import { createApp } from "vue";
import { Root } from "./root";
import { createAppRouter } from "./router";

function init() {
  const app = createApp(Root);
  app.use(createAppRouter());
  app.mount("#app");
  return app;
}
init();
