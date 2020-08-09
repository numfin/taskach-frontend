const autoPreprocess = require("svelte-preprocess");
const path = require("path");

module.exports = ({ config }) => {
  const svelteLoader = config.module.rules.find(
    (r) => r.loader && r.loader.includes("svelte-loader")
  );
  svelteLoader.options.preprocess = autoPreprocess({
    less: { includePaths: ["src", "node_modules"] },
    css: { includePaths: ["src", "node_modules"] },
    typescript: {
      tsconfigFile: "./tsconfig.json",
      transpileOnly: true,
    },
  });
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.alias["@"] = path.resolve(__dirname, "../src");
  return config;
};
