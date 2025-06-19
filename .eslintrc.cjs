/* eslint-env node */

module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "htmlacademy/react-typescript",
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
      node: {
      paths: ['src'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  plugins: [
    'react-refresh',
    'import'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'import/no-unused-modules': [1, {
      unusedExports: true,
      missingExports: true,
    }],
    'import/no-unused-imports': 'error',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true }
    }],
  },
  overrides: [
    {
      files: [ '*test*' ],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'import/no-unused-modules': 'off'
      }
    },
  ],
}
