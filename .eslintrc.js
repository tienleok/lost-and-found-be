module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    "plugin:jest/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    "jest"
  ],
  rules: {
  }
}
