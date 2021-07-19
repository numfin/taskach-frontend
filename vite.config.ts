import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [vueJsx(), WindiCSS()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
