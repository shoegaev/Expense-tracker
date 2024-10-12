import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/*config.js", "**/*eslintrc.js", "**/*config.ts"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "no-plusplus": "off",
        "no-console": "warn",

        "max-len": ["warn", {
            code: 120,
            ignorePattern: "^import .*",
        }],

        indent: ["warn", 2, {
            SwitchCase: 1,
        }],

        "import/prefer-default-export": "off",

        "no-param-reassign": ["error", {
            props: false,
        }],

        "max-lines-per-function": ["error", 50],
    },
}, {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 5,
        sourceType: "commonjs",
    },
}];