import js from "@eslint/js";
import fsdPlugin from "eslint-plugin-fsd-lint";
import pluginImport from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      import: pluginImport,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      fsd: fsdPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-sort-props": [
        "warn",
        {
          ignoreCase: true,
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@progress/**",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "fsd/forbidden-imports": "error",
      "fsd/no-relative-imports": ["error", { allowSameSlice: true }],
      "fsd/no-public-api-sidestep": "error",
      "fsd/no-cross-slice-dependency": "error",
      "fsd/no-ui-in-business-logic": "error",
      "fsd/no-global-store-imports": "error",
      "fsd/ordered-imports": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
      fsd: {
        alias: "@",
        layers: ["shared", "entities", "features", "widgets", "pages", "app"],
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },
  },
);
