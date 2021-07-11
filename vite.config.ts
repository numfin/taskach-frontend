import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '~': resolve(__dirname),
    },
  },
  css: {
    modules: {
      localsConvention: 'dashesOnly',
    },
  },
});
