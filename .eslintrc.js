module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  globals: {
    __DEV__: true,
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    'import/core-modules': [
      'app',
    ],
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  rules: {
    "jsx-a11y/accessible-emoji": 0,
    camelcase: 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'ignore',
      exceptions: [],
    }],
    'max-len': 0,
    'react/destructuring-assignment': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^app/.+$',
        ],
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
    'import/extensions': [
      'error', 'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
