module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling"],
          "index",
          "object",
        ],
      },
    ],
    "import/newline-after-import": ["warn", { count: 1 }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".vue", ".ts", ".tsx", ".css"],
      },
    },
  },
};
