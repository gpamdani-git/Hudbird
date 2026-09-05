// packages/theme/src/index.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addBase, theme }) {
    addBase({
      ':root': {
        '--background': '255 255 255',
        '--elevated': '248 250 252',
        '--overlay': '0 0 0',
        '--primary-indigo': '79 70 229',
        '--success': '34 197 94',
        '--danger': '239 68 68',
      },
      '.dark': {
        '--background': '3 7 18',
        '--elevated': '17 24 39',
        '--overlay': '255 255 255',
        '--primary-indigo': '99 102 241',
        '--success': '74 222 128',
        '--danger': '248 113 113',
      }
    });
  },
  {
    theme: {
      extend: {
        colors: {
          background: 'rgb(var(--background) / <alpha-value>)',
          elevated: 'rgb(var(--elevated) / <alpha-value>)',
          overlay: 'rgb(var(--overlay) / <alpha-value>)',
          primary: {
            indigo: 'rgb(var(--primary-indigo) / <alpha-value>)',
          },
          success: 'rgb(var(--success) / <alpha-value>)',
          danger: 'rgb(var(--danger) / <alpha-value>)',
        },
        borderRadius: {
          'xl': '0.75rem',
          '2xl': '1rem',
        }
      },
    },
  }
);
