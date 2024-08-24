import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist', 'node_modules']
  },
  { files: ['**/*.{ts}'] },
  {
    languageOptions: { globals: globals.node },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prefer-const': 'error',
      'no-unused-vars': 'error'
    }
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
