module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "prettier/prettier": ["error"]
    }
};
