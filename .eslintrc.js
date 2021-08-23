module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'import/newline-after-import': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'array-callback-return': 'off',
    'no-param-reassign': 'off',
  },
};
