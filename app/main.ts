import 'tailwindcss/tailwind.css';
import { createApp } from 'vue';

import { createAppRouter } from './router';

import { App } from '~/ui/layout/app';

function init() {
  const app = createApp(App);
  app.use(createAppRouter());
  app.mount('#app');
  return app;
}
init();
