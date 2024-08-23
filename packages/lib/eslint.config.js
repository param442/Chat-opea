// eslint.config.js
module.exports = {
  extends: [
    "eslint:recommended",
    // Add other configurations or presets as needed
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // Add or modify rules as needed
  },
};
