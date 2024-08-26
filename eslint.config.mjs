import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        prettier: eslintPluginPrettier,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'no-var': 'error',
    },
  },
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  prettier,
];
