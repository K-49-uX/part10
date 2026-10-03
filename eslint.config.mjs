import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
// (Keep any other imports you already have at the top)

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, languageOptions: { globals: { ...globals.browser, ...globals.jest } } },
  {
    files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "19.2.3",
      },
    },
    rules: {
      "react/prop-types": "off",
    },
  },
]);