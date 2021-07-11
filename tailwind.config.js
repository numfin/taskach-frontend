module.exports = {
  purge: ['./index.html', './{app,routes,ui}/**/*.{ts,tsx}'],
  jit: true,
  theme: {
    extend: {
      spacing: {
        4.5: '1.10rem',
      },
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
  plugins: [],
};
