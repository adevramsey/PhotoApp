import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser
    },

    plugins: {
      react
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      /**
       * 🔥 CRITICAL FIX FOR FRAMER MOTION
       */
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "warn",
      "react/jsx-uses-vars": "error",

      /**
       * React 17+ does not require React in scope
       */
      "react/react-in-jsx-scope": "off",

      /**
       * Vite HMR safety
       */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    }
  }
]);
