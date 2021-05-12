/* eslint-disable no-undef */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: { version: "detect" },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types":
      "off",
    "prettier/prettier": "error",
  },
}
