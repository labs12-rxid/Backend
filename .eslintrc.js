module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "jest/globals": true
  },
  "extends": ["eslint:recommended", "plugin:jest/recommended", "prettier"],
  "plugins": ["jest"],
  "rules": {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
}