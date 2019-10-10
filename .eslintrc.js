module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['error']
  }
}
