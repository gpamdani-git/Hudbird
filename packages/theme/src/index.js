// packages/theme/src/index.js
const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  function ({ addBase, theme }) {
    addBase({
      ":root": {
        "--background": "255 255 255",
        "--elevated": "249 250 251",
        "--overlay": "0 0 0",
        "--border": "229 231 235",
        "--primary-indigo": "79 70 229",
        "--stitch-lilac": "217 70 239",
        "--stitch-prose": "39 39 42",
        "--stitch-muted": "113 113 122",
        "--success": "34 197 94",
        "--danger": "239 68 68",
      },
      ".dark": {
        "--background": "22 22 24", // Google Stitch Obsidian Charcoal (#161618)
        "--elevated": "32 33 36", // Google Stitch Elevated Surface (#202124)
        "--overlay": "22 22 24",
        "--border": "46 47 51", // Google Stitch Hairline Border (#2E2F33)
        "--primary-indigo": "99 102 241",
        "--stitch-lilac": "255 177 238", // Google Stitch Luminous Lilac (#FFB1EE)
        "--stitch-prose": "229 229 229", // Google Stitch Editorial Prose (#E5E5E5)
        "--stitch-muted": "130 130 130", // Google Stitch Muted Metadata (#828282)
        "--success": "74 222 128",
        "--danger": "248 113 113",
      },
    });
  },
  {
    theme: {
      extend: {
        keyframes: {
          shimmer: {
            "100%": { transform: "translateX(100%)" },
          },
        },
        animation: {
          shimmer: "shimmer 2s infinite",
        },
        colors: {
          background: "rgb(var(--background) / <alpha-value>)",
          elevated: "rgb(var(--elevated) / <alpha-value>)",
          overlay: "rgb(var(--overlay) / <alpha-value>)",
          border: "rgb(var(--border) / <alpha-value>)",
          primary: {
            indigo: "rgb(var(--primary-indigo) / <alpha-value>)",
          },
          stitch: {
            canvas: "#161618",
            surface: "#202124",
            border: "#2E2F33",
            lilac: "#FFB1EE",
            prose: "#E5E5E5",
            muted: "#828282",
          },
          success: "rgb(var(--success) / <alpha-value>)",
          danger: "rgb(var(--danger) / <alpha-value>)",
        },
        letterSpacing: {
          "stitch-display": "-1.8px",
          "stitch-heading": "-0.3px",
          "stitch-body": "-0.16px",
          "stitch-eyebrow": "1.4px",
        },
        lineHeight: {
          "stitch-display": "1.15",
          "stitch-subtitle": "1.625",
          "stitch-prose": "1.7",
        },
        borderRadius: {
          xl: "0.75rem",
          "2xl": "1rem",
        },
      },
    },
  }
);
