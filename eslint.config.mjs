// @ts-check
import prettierPlugin from 'eslint-plugin-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.vue', '**/*.js'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],

      'arrow-body-style': ['error', 'as-needed'],

      eqeqeq: ['error', 'always'],

      'import/newline-after-import': ['error', { count: 1 }],

      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unused-vars': 'off',

      'object-shorthand': ['error', 'always'],

      'prefer-destructuring': ['error', { object: true, array: false }],

      quotes: ['error', 'single', { avoidEscape: true }],

      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],

      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 },
          multiline: { max: 1 },
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  }
);
