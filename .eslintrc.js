module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "no-plusplus": "off",
    "no-console": "warn",
    "max-len": ["warn", { code: 120, ignorePattern: "^import .*" }],
    indent: [
      "warn",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "import/prefer-default-export": "off",
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "max-lines-per-function": ["error", 50],
  },
  ignorePatterns: ["*config.js", "*eslintrc.js", "*config.ts"],
};
