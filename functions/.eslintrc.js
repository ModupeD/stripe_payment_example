module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*",
    "/generated/**/*",
    "*.js"  // This will ignore all JavaScript files
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    // Disable problematic rules
    "indent": "off",
    "@typescript-eslint/indent": "off",
    "quotes": "off",
    "max-len": "off",
    "object-curly-spacing": "off",
    "comma-dangle": "off",
    "keyword-spacing": "off",
    "brace-style": "off",
    "no-trailing-spaces": "off",
    "key-spacing": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "space-before-blocks": "off"
  },
};