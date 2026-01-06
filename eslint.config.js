import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginImport from 'eslint-plugin-import'

export default [
  // files to ignore
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  // Base recommended JS rules
  js.configs.recommended,

  // TypeScript recommended rules (uses @typescript-eslint/parser automatically)
  ...tseslint.configs.recommended,

  // Prettier and import plugins
  {
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Prettier errors will surface as ESLint errors
      'prettier/prettier': 'error',

      // Customize unused-vars handling for TS
      '@typescript-eslint/no-unused-vars': ['warn'],

      // Enforce sorted imports with blank lines between groups
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },

  // Prettier’s “config” itself (turns off stylistic rules)
  prettier,
]
