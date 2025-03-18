module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    allowAutomaticSingleRunInference: true,
    tsconfigRootDir: __dirname,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'prettier/prettier': ['error'],
  },
};
