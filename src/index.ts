// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';
import { createApp } from 'vue';

import { createAppRouter } from './app/router';

import { App } from '~/app/app';

function init() {
  const app = createApp(App);
  app.use(createAppRouter());
  app.mount('#app');
  return app;
}
init();
