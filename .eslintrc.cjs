module.exports = {
  parserOptions: {
    ecmaVersion:'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    mocha: true,
    node: true
  },
  extends: 'airbnb-base',
  overrides: [],
  rules: {
    'max-len': 0,
    'import/extensions': [
      'error',
      'always',
      {
        mjs: 'always',
      }
    ],
  },
};