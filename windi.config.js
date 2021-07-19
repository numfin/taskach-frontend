import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';

export default defineConfig({
  extract: {
    include: ['index.html', 'src/**/*.{jsx,tsx}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
          return `.${className}:hover, .${className}:focus`;
        });
      });
    }),
  ],
});
