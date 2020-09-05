import svelte from "vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess";
import { resolve } from "path";

export default {
  plugins: [svelte({ preprocess: sveltePreprocess() })],
  rollupDedupe: ["svelte"],
  alias: {
    "/src/": resolve(__dirname, "./src"),
  },
};
